const path = require("path");
const fs = require("fs");
const os = require("os");

function resolveProductionBaseDir() {
  const appDataPath = process.env.APPDATA
    || (process.platform === "darwin"
      ? path.join(os.homedir(), "Library", "Application Support")
      : path.join(os.homedir(), ".config"));

  return path.join(appDataPath, "salespeck");
}

function resolveDatabasePath() {
  const isPackagedRuntime = __dirname.includes("app.asar");
  if (isPackagedRuntime) {
    return path.join(resolveProductionBaseDir(), "boutique.sqlite");
  }

  return path.join(__dirname, "..", "db", "boutique.sqlite");
}

function ensureDatabaseDirectory() {
  const databasePath = resolveDatabasePath();
  const databaseDir = path.dirname(databasePath);
  if (!fs.existsSync(databaseDir)) {
    fs.mkdirSync(databaseDir, { recursive: true });
  }
  return databaseDir;
}

function resolveDatabaseUrl() {
  const databasePath = resolveDatabasePath();
  return `file:${databasePath.replace(/\\/g, "/")}`;
}

module.exports = {
  resolveDatabasePath,
  ensureDatabaseDirectory,
  resolveDatabaseUrl,
};
