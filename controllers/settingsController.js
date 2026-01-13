const { softwaresetting } = require("../models");
const config = require("../installEnv");

exports.index = async (req, res) => {
  let settings = await softwaresetting.findAll({});
  let settingsObj = {};
  settings.forEach((setting) => {
    settingsObj[setting.name] = JSON.parse(setting.value);
  });
  
  // Add API settings from .settings file
  if (!settingsObj.api) {
    settingsObj.api = {
      update_url: config.update_url || '',
      CI_PROJECT_ID: config.CI_PROJECT_ID || 62990895,
      install_date: config.install_date || '',
      install_type: config.install_type || 'desktop'
    };
  } else {
    // Sync with .settings file
    settingsObj.api.update_url = config.update_url || settingsObj.api.update_url;
    settingsObj.api.CI_PROJECT_ID = config.CI_PROJECT_ID || settingsObj.api.CI_PROJECT_ID || 62990895;
    settingsObj.api.install_date = config.install_date || settingsObj.api.install_date;
    settingsObj.api.install_type = config.install_type || settingsObj.api.install_type;
  }
  
  let currenttab = req.query.currenttab || Object.keys(settingsObj)[0];
  if (Object.keys(settingsObj).includes(currenttab) === false) {
    currenttab = Object.keys(settingsObj)[0];
  }
  res.render("settings/index", { settings: settingsObj, currenttab });
};

exports.save = async (req, res) => {
  let settingName = req.query.name;
  
  // If saving API settings, update .settings file
  if (settingName === 'api') {
    const update_url = req.body.update_url;
    if (update_url) {
      config.updateSetting('update_url', update_url);
    }
    
    const CI_PROJECT_ID = req.body.CI_PROJECT_ID;
    if (CI_PROJECT_ID) {
      config.updateSetting('CI_PROJECT_ID', CI_PROJECT_ID);
    }
    
    const install_type = req.body.install_type;
    if (install_type) {
      config.updateSetting('install_type', install_type);
    }
    
    // Also save to database for UI
    let values = JSON.stringify(req.body);
    await softwaresetting.update({ value: values }, { where: { name: settingName } });
  } else {
    // Other settings go to database only
    let values = JSON.stringify(req.body);
    await softwaresetting.update({ value: values }, { where: { name: settingName } });
  }
  
  req.session.message = { type: "success", text: "Settings saved successfully!" };
  res.redirect(`/settings?currenttab=${settingName}`);
};