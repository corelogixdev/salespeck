"use strict";

const license = require("../utils/license");

const ALLOW_PREFIXES = [
  "/license",
  "/assets",
  "/uploads",
  "/node_modules",
  "/temp-pdfs",
  "/api/verify-server",
  "/logout",
];

function isAllowedPath(urlPath) {
  return ALLOW_PREFIXES.some(
    (p) => urlPath === p || urlPath.startsWith(p + "/") || urlPath.startsWith(p + "?")
  );
}

module.exports = async function licenseGate(req, res, next) {
  try {
    const urlPath = (req.path || req.url || "").split("?")[0];
    if (isAllowedPath(urlPath)) {
      return next();
    }

    const status = await license.getLicenseStatus();
    res.locals.licenseStatus = status;

    if (status.allowsAppUse) {
      return next();
    }

    // HTML clients → activation page; API → JSON
    const wantsHtml = String(req.headers.accept || "").includes("text/html");
    if (wantsHtml || req.method === "GET") {
      return res.redirect("/license/activate");
    }
    return res.status(403).json({
      status: "error",
      message: status.message || "License required",
      licenseState: status.state,
    });
  } catch (err) {
    console.error("licenseGate error:", err);
    return res.redirect("/license/activate");
  }
};
