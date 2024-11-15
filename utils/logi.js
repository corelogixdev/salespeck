const fs = require('fs');
const path = require('path');
const { app } = require('electron');
var config = require('../config.js');



//receive a message like console.log i can call it with comma separated values
function log(...message) {
  if (config.env === 'production') {
    console.log(path.join(app.getPath('userData'), 'logs.txt'));
    const logFilePath = path.join(app.getPath('userData'), 'logs.txt'); 
    const timestamp = new Date().toISOString();
    //message may be object
    if (message.length === 1 && typeof message[0] === 'object') {
      message = [JSON.stringify(message[0], null, 2)];
    }
    var messages = message.join(' ');
    const logMessage = `${timestamp} - ${messages}\n`;
    
    // Append log to file
    fs.appendFileSync(logFilePath, logMessage);
  } else {
    console.log(message.join(' '));
  }
}

module.exports = log;