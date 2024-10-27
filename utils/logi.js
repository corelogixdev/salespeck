const fs = require('fs');
const path = require('path');
const { app } = require('electron');
var config = require('../config.js');



function log(message) {
  if (config.env === 'production') {
    console.log(path.join(app.getPath('userData'), 'logs.txt'));
    const logFilePath = path.join(app.getPath('userData'), 'logs.txt'); 
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    
    // Append log to file
    fs.appendFileSync(logFilePath, logMessage);
  } else {
    console.log(message);
  }
}

module.exports = log;