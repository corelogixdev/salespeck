"use strict";

const license = require("../utils/license");

function activateLocals(extra = {}) {
  return {
    hidenav: true,
    layout: "layout",
    fingerprint: license.getMachineFingerprint(),
    ...extra,
  };
}

exports.activateGet = async (req, res) => {
  const status = await license.getLicenseStatus();
  res.render(
    "license/activate",
    activateLocals({
      status,
      error: null,
      success: null,
      licenseKey: "",
    })
  );
};

exports.activatePost = async (req, res) => {
  const key = req.body.licenseKey || req.body.key || "";
  try {
    const status = await license.activateLicense(key);
    req.session.message = {
      type: "success",
      text: `License activated for ${status.clientName || "client"} (${status.plan}, ${status.seatsMax} seats).`,
    };
    return res.redirect("/");
  } catch (err) {
    const status = await license.getLicenseStatus();
    return res.status(400).render(
      "license/activate",
      activateLocals({
        status,
        error: err.message || "Activation failed",
        success: null,
        licenseKey: key,
      })
    );
  }
};

exports.statusJson = async (req, res) => {
  try {
    const status = await license.getLicenseStatus();
    res.json({ success: true, status });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
