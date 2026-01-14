const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const os = require('os');

// Default runtime settings (for .settings file)
const DEFAULT_SETTINGS = [
  { key: 'install_date', value: new Date().toISOString() },
  { key: 'install_type', value: 'desktop' },
  { key: 'update_url', value: 'https://gitlab.com/api/v4/projects/62990895/packages/generic/openmenu/release' },
  { key: 'CI_PROJECT_ID', value: 62990895 },
  { key: 'SERVER_IP', value: 'localhost' },
  { key: 'port', value: 3000 },
  { key: 'logging', value: true },
  { key: 'logger', value: 'file' },
  { key: 'env', value: 'development' },
  { key: 'printer', value: JSON.stringify({
    printer: 'printer',
    paper: 'paper',
    width: 'width',
    height: 'height',
    fontSize: 'fontSize'
  })}
];

// Determine the path for .settings file
// In packaged Electron apps, __dirname points to app.asar which is read-only
// So we need to use a writable location outside app.asar
function getSettingsPath() {
  // Check if we're in a packaged Electron app (app.asar exists in path)
  if (__dirname.includes('app.asar')) {
    // Use userData directory (same logic as models/index.js for database)
    let appDataPath = process.env.APPDATA || 
      (process.platform === 'darwin' 
        ? path.join(os.homedir(), 'Library', 'Application Support') 
        : path.join(os.homedir(), '.config'));
    const settingsDir = path.join(appDataPath, 'openmenu');
    // Ensure directory exists
    if (!fs.existsSync(settingsDir)) {
      fs.mkdirSync(settingsDir, { recursive: true });
    }
    return path.join(settingsDir, '.settings');
  } else {
    // Development mode - use __dirname
    return path.join(__dirname, '.settings');
  }
}

const settingsPath = getSettingsPath();

// Load or create .settings file (runtime settings)
function loadSettings() {
  let settings = {};
  
  if (fs.existsSync(settingsPath)) {
    // File exists - load existing settings
    try {
      const content = fs.readFileSync(settingsPath, 'utf8');
      settings = dotenv.parse(content);
      console.log('Loaded existing .settings file');
    } catch (error) {
      console.error('Error reading .settings file:', error);
      settings = {};
    }
  } else {
    // File doesn't exist - create with defaults
    console.log('Creating .settings file with default values...');
  }
  
  // Merge defaults with existing settings (existing values take priority)
  let settingsContent = '';
  let hasChanges = false;
  
  DEFAULT_SETTINGS.forEach(({ key, value }) => {
    // Keep existing value if present, otherwise use default
    if (settings[key] === undefined) {
      settings[key] = value;
      hasChanges = true;
    }
    settingsContent += `${key}=${settings[key]}\n`;
  });
  
  // Add any extra settings that exist but aren't in defaults (preserve them)
  Object.keys(settings).forEach(key => {
    const existsInDefaults = DEFAULT_SETTINGS.some(s => s.key === key);
    if (!existsInDefaults) {
      settingsContent += `${key}=${settings[key]}\n`;
    }
  });
  
  // Write .settings file if it didn't exist or if we added new defaults
  if (!fs.existsSync(settingsPath) || hasChanges) {
    fs.writeFileSync(settingsPath, settingsContent);
    console.log('Updated .settings file');
  }
  
  return settings;
}

// Load settings
const runtimeSettings = loadSettings();

// Build config object
const config = {
  // Runtime settings (from .settings)
  port: parseInt(runtimeSettings.port) || 3000,
  logging: runtimeSettings.logging === 'true' || runtimeSettings.logging === true,
  logger: runtimeSettings.logger || 'file',
  env: runtimeSettings.env || 'production',
  install_date: runtimeSettings.install_date,
  install_type: runtimeSettings.install_type || 'desktop',
  update_url: runtimeSettings.update_url,
  CI_PROJECT_ID: parseInt(runtimeSettings.CI_PROJECT_ID) || 62990895,
  SERVER_IP: runtimeSettings.SERVER_IP || 'localhost',
  printer: runtimeSettings.printer ? (typeof runtimeSettings.printer === 'string' ? JSON.parse(runtimeSettings.printer) : runtimeSettings.printer) : {
    printer: 'printer',
    paper: 'paper',
    width: 'width',
    height: 'height',
    fontSize: 'fontSize'
  }
};

// Export function to update settings (for settings page)
config.updateSetting = function(key, value) {
  let settings = {};
  
  if (fs.existsSync(settingsPath)) {
    try {
      const content = fs.readFileSync(settingsPath, 'utf8');
      settings = dotenv.parse(content);
    } catch (error) {
      console.error('Error reading .settings file:', error);
    }
  }
  
  // Update the setting
  // If value is an object, stringify it for storage
  const valueToStore = typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
  settings[key] = valueToStore;
  
  // Write back to file
  let settingsContent = '';
  DEFAULT_SETTINGS.forEach(({ key: defaultKey }) => {
    const defaultValue = DEFAULT_SETTINGS.find(s => s.key === defaultKey)?.value;
    settingsContent += `${defaultKey}=${settings[defaultKey] !== undefined ? settings[defaultKey] : defaultValue}\n`;
  });
  
  // Add any extra settings
  Object.keys(settings).forEach(key => {
    const existsInDefaults = DEFAULT_SETTINGS.some(s => s.key === key);
    if (!existsInDefaults) {
      settingsContent += `${key}=${settings[key]}\n`;
    }
  });
  
  fs.writeFileSync(settingsPath, settingsContent);
  
  // Update runtime config
  // Parse JSON strings back to objects for config
  if (key === 'printer' && typeof valueToStore === 'string') {
    try {
      this[key] = JSON.parse(valueToStore);
    } catch (e) {
      this[key] = valueToStore;
    }
  } else {
    this[key] = value;
  }
  
  console.log(`Updated setting: ${key} = ${value}`);
};

// Export function to get all settings
config.getAllSettings = function() {
  let settings = {};
  if (fs.existsSync(settingsPath)) {
    try {
      const content = fs.readFileSync(settingsPath, 'utf8');
      settings = dotenv.parse(content);
    } catch (error) {
      console.error('Error reading .settings file:', error);
    }
  }
  return settings;
};

module.exports = config;
