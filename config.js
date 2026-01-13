var env = 'development';
var CI_PROJECT_ID = 62990895;
var GITLAB_TOKEN = 'REDACTED_GITLAB_TOKEN';
const config = {
  "development": {
    "setup_type": 'server', // server, client
    "serving_type": 'web', //web, desktop
    "env": "development",
    "port": 3000,
    'logging': true,
    'logger': 'console',
    'CI_PROJECT_ID': CI_PROJECT_ID,
    'GITLAB_TOKEN': GITLAB_TOKEN
  },
  "production": {
    "setup_type": 'server', // server, client
    "serving_type": 'desktop', //web, desktop
    "env": "production",
    "port": 3000,
    'logging': true,
    'logger': 'file',
    'CI_PROJECT_ID': CI_PROJECT_ID,
    'GITLAB_TOKEN': GITLAB_TOKEN
  }
}
var loadedenv = config[env];
//if config var not in .env file, then copy it to .env file, also if .env file does not exists, then create it
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file');
  fs.writeFileSync(envPath, '');
}
const envConfig = dotenv.parse(fs.readFileSync(envPath));
for (const k in loadedenv) {
  if (envConfig[k] === undefined) {
    envConfig[k] = loadedenv[k];
  }
}

console.log('updating .env file');
// Convert the object to a string in KEY=VALUE format
let envConfigString = '';
envConfigString += `install_date=${new Date().toISOString()}\n`;
for (const key in envConfig) {
  envConfigString += `${key}=${envConfig[key]}\n`;
}

// Write the string to the file
fs.writeFileSync(envPath, envConfigString);

module.exports = loadedenv;