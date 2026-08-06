"use strict";

const fs = require("fs");
const path = require("path");
const { resolveDatabasePath } = require("./prismaDbConfig");

/** Built-in default: `<db-dir>/backups` (dev or AppData). */
function getDefaultBackupDir() {
  return path.join(path.dirname(resolveDatabasePath()), "backups");
}

/** Normalize for .settings (avoid dotenv backslash escapes on Windows). */
function toSettingsPath(p) {
  return String(p || "")
    .trim()
    .replace(/\\/g, "/");
}

function fromSettingsPath(p) {
  const raw = String(p || "").trim();
  if (!raw) return getDefaultBackupDir();
  return path.normalize(raw);
}

/**
 * Effective backup directory from .settings `backup_path`, or default.
 * Creates the folder if missing.
 */
function resolveBackupDir(configuredPath) {
  let dir;
  if (configuredPath && String(configuredPath).trim()) {
    dir = fromSettingsPath(configuredPath);
  } else {
    try {
      const config = require("../installEnv");
      dir = fromSettingsPath(config.backup_path || config.getAllSettings?.()?.backup_path);
    } catch {
      dir = getDefaultBackupDir();
    }
  }

  if (!dir) dir = getDefaultBackupDir();

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

/**
 * Copy live SQLite DB into the configured backup folder.
 * @returns {{ ok: true, path: string, dir: string, filename: string } | { ok: false, error: string }}
 */
function writeDatabaseBackup(options = {}) {
  const prefix = options.prefix || "salespeck-backup";
  const databasePath = resolveDatabasePath();

  if (!databasePath || !fs.existsSync(databasePath)) {
    return { ok: false, error: "Database file not found" };
  }

  const stats = fs.statSync(databasePath);
  if (!stats || stats.size === 0) {
    return { ok: false, error: "Database file is empty" };
  }

  const dir = resolveBackupDir(options.backupPath);
  const stamp =
    options.stamp ||
    new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const filename = `${prefix}-${stamp}.sqlite`;
  const dest = path.join(dir, filename);

  fs.copyFileSync(databasePath, dest);

  return {
    ok: true,
    path: dest,
    dir,
    filename,
  };
}

module.exports = {
  getDefaultBackupDir,
  toSettingsPath,
  fromSettingsPath,
  resolveBackupDir,
  writeDatabaseBackup,
};
