const fs = require('fs');
const path = require('path');
let electronApp = null;
try {
  // In dev/server runtime we run inside Electron; for some CLI scripts we may not.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ({ app: electronApp } = require('electron'));
} catch {
  electronApp = null;
}
var config = require('../installEnv.js');
const os = require('os');

let logDirCreated = false;

// Function to delete old log files
function deleteOldLogs(logDir) {
  try {
    if (!fs.existsSync(logDir)) return;
    const files = fs.readdirSync(logDir);
    const logFiles = files.filter(file => file.startsWith('logs-') && file.endsWith('.txt'));
    logFiles.sort((a, b) => {
      const aTime = fs.statSync(path.join(logDir, a)).mtime.getTime();
      const bTime = fs.statSync(path.join(logDir, b)).mtime.getTime();
      return bTime - aTime;
    });

    while (logFiles.length > 7) {
      const fileToDelete = logFiles.pop();
      fs.unlinkSync(path.join(logDir, fileToDelete));
    }
  } catch (err) {
    console.error('Failed to cleanup old logs:', err);
  }
}

function stringifyMessagePart(part) {
  if (typeof part === 'string') {
    return part;
  }

  if (
    typeof part === 'number'
    || typeof part === 'boolean'
    || typeof part === 'bigint'
    || typeof part === 'symbol'
    || part === null
    || part === undefined
  ) {
    return String(part);
  }

  if (part instanceof Error) {
    return part.stack || part.message || String(part);
  }

  try {
    return JSON.stringify(part, null, 2);
  } catch {
    return String(part);
  }
}

function formatMessages(message) {
  return message.map(stringifyMessagePart).join(' ');
}

function getLogDirectory() {
  return (
    (electronApp && typeof electronApp.getPath === 'function' ? electronApp.getPath('userData') : null) ||
    path.join(os.homedir(), '.openmenu', 'logs')
  );
}

// Perform cleanup once on load
try {
  const initialLogDir = getLogDirectory();
  deleteOldLogs(initialLogDir);
} catch (e) {}

// Receive a message like console.log, can call it with comma-separated values
function log(...message) {
  // In dev, always show logs in console for fast debugging.
  if (config.env === 'development') {
    // eslint-disable-next-line no-console
    console.log(formatMessages(message));
    return;
  }

  if (!(config.logging === true || config.logging === 'true')) {
    return;
  }

  if (config.logger === 'file') {
    try {
      const logDir = getLogDirectory();

      if (!logDirCreated) {
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true });
        }
        logDirCreated = true;
      }

      const logFilePath = path.join(logDir, `logs-${new Date().toISOString().split('T')[0]}.txt`);
      const timestamp = new Date().toISOString();

      const messages = formatMessages(message);
      const logMessage = `${timestamp} - ${messages}\n`;

      // Append log to file
      fs.appendFileSync(logFilePath, logMessage);
    } catch {
      // eslint-disable-next-line no-console
      console.log(formatMessages(message));
    }
  } else {
    // eslint-disable-next-line no-console
    console.log(formatMessages(message));
  }
}

module.exports = log;
module.exports.getLogDirectory = getLogDirectory;
module.exports.deleteOldLogs = deleteOldLogs;