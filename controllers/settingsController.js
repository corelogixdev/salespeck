const { softwaresetting } = require("../models");
const config = require("../installEnv");

exports.index = async (req, res) => {
  // Get database settings
  let dbSettings = await softwaresetting.findAll({});
  let dbSettingsObj = {};
  dbSettings.forEach((setting) => {
    dbSettingsObj[setting.name] = JSON.parse(setting.value);
  });
  
  // Get .settings file variables
  const envSettings = {
    update_url: config.update_url || '',
    CI_PROJECT_ID: config.CI_PROJECT_ID || 62990895,
    install_date: config.install_date || '',
    install_type: config.install_type || 'desktop',
    SERVER_IP: config.SERVER_IP || 'localhost',
    port: config.port || 3000,
    logging: config.logging || false,
    logger: config.logger || 'file',
    env: config.env || 'development',
    printer: config.printer || {
      printer: 'printer',
      paper: 'paper',
      width: 'width',
      height: 'height',
      fontSize: 'fontSize'
    }
  };
  
  let currenttab = req.query.currenttab || 'env';
  if (currenttab !== 'env' && currenttab !== 'db') {
    currenttab = 'env';
  }
  
  res.render("settings/index", { 
    envSettings, 
    dbSettings: dbSettingsObj, 
    currenttab 
  });
};

exports.save = async (req, res) => {
  let tabType = req.query.type; // 'env' or 'db'
  let settingName = req.query.name; // For db settings only
  
  if (tabType === 'env') {
    // Save .settings file variables
    // Handle printer settings (comes as printer[field] from form)
    const printerSettings = {};
    Object.keys(req.body).forEach(key => {
      if (key.startsWith('printer[')) {
        // Extract field name from printer[field] format
        const fieldName = key.match(/printer\[(.+)\]/)[1];
        printerSettings[fieldName] = req.body[key];
      }
    });
    
    // Save printer settings if any were provided
    if (Object.keys(printerSettings).length > 0) {
      config.updateSetting('printer', JSON.stringify(printerSettings));
    }
    
    // Save other settings
    Object.keys(req.body).forEach(key => {
      if (key.startsWith('printer[')) {
        // Skip printer fields, already handled above
        return;
      } else if (key === 'logging') {
        // Handle checkbox - if checked, value is 'on', otherwise undefined
        config.updateSetting(key, req.body[key] === 'on' || req.body[key] === true || req.body[key] === 'true');
      } else {
        config.updateSetting(key, req.body[key]);
      }
    });
  } else if (tabType === 'db' && settingName) {
    // Save database settings
    let values = JSON.stringify(req.body);
    await softwaresetting.update({ value: values }, { where: { name: settingName } });
  }
  
  req.session.message = { type: "success", text: "Settings saved successfully!" };
  res.redirect(`/settings?currenttab=${tabType}`);
};