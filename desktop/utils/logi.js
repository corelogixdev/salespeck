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

// Function to delete old log files
function deleteOldLogs(logDir) {
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
}

// Receive a message like console.log, can call it with comma-separated values
function log(...message) {
  // In dev, always show logs in console for fast debugging.
  if (config.env === 'development') {
    if (message.length === 1 && typeof message[0] === 'object') {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(message[0], null, 2));
      return;
    }
    // eslint-disable-next-line no-console
    console.log(message.join(' '));
    return;
  }

  if (!(config.logging === true || config.logging === 'true')) {
    return;
  }

  if (config.logger === 'file') {
    try {
      const logDir =
        (electronApp && typeof electronApp.getPath === 'function' ? electronApp.getPath('userData') : null) ||
        path.join(os.homedir(), '.openmenu', 'logs');

      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }

      const logFilePath = path.join(logDir, `logs-${new Date().toISOString().split('T')[0]}.txt`);
      const timestamp = new Date().toISOString();

      // Message may be object
      if (message.length === 1 && typeof message[0] === 'object') {
        message = [JSON.stringify(message[0], null, 2)];
      }
      const messages = message.join(' ');
      const logMessage = `${timestamp} - ${messages}\n`;

      // Append log to file
      fs.appendFileSync(logFilePath, logMessage);

      // Delete old log files
      deleteOldLogs(logDir);
    } catch {
      // eslint-disable-next-line no-console
      console.log(message.join(' '));
    }
  } else {
    // eslint-disable-next-line no-console
    console.log(message.join(' '));
  }
}

module.exports = log;