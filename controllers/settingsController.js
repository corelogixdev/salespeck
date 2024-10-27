const { Op } = require("sequelize");
const db = require("../models");

exports.index = async (req, res) => {
  res.render("settings/index", { title: "Settings" });
};
