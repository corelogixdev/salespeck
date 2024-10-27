const { softwaresetting } = require("../models");

exports.index = async (req, res) => {
  let settings = await softwaresetting.findAll({});
  let settingsObj = {};
  settings.forEach((setting) => {
    settingsObj[setting.name] = JSON.parse(setting.value);
  });
  let currenttab = req.query.currenttab || Object.keys(settingsObj)[0];
  if (Object.keys(settingsObj).includes(currenttab) === false) {
    currenttab = Object.keys(settingsObj)[0];
  }
  res.render("settings/index", { settings: settingsObj, currenttab });
};

exports.save = async (req, res) => {
  let settingName = req.query.name;
  let values = JSON.stringify(req.body);
  await softwaresetting.update({ value: values }, { where: { name: settingName } });
  req.session.message = { type: "success", text: "Settings saved successfully!" };
  res.redirect(`/settings?currenttab=${settingName}`);
};