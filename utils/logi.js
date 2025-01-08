const fs = require('fs');
const path = require('path');
const { app } = require('electron');
var config = require('../config.js');

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
  if (config.env === 'production') {
    try {
      const logDir = app.getPath('userData');
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
    } catch (e) {
      console.log(message.join(' '));
    }
  } else {
    console.log(message.join(' '));
  }
}

module.exports = log;