const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const os = require('os');

// Default runtime settings (for .settings file)
const DEFAULT_SETTINGS = [
  { key: 'install_date', value: new Date().toISOString() },
  { key: 'update_url', value: 'https://gitlab.com/api/v4/projects/62990895/packages/generic/openmenu/release' },
  { key: 'CI_PROJECT_ID', value: 62990895 },
  { key: 'SERVER_IP', value: 'localhost' },
  { key: 'port', value: 5783 },
  { key: 'logging', value: false },
  { key: 'logger', value: 'file' },
  { key: 'env', value: 'production' },
  { key: 'printer', value: JSON.stringify({
    printer: 'Default',
    paper: '58mm',
    width: 58,
    height: 200,
    fontSize: 12,
    silentPrinting: false,
    numberOfPrints: 1
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
// Note: Values from .env file (process.env) take precedence over .settings file
function loadSettings() {
  let settings = {};
  let fileExists = fs.existsSync(settingsPath);
  
  if (fileExists) {
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
  
  // Merge: Add any new variables from DEFAULT_SETTINGS that don't exist in .settings
  // Existing values in .settings take priority (don't override)
  let settingsContent = '';
  let hasChanges = false;
  
  // First, write all existing settings from .settings file
  Object.keys(settings).forEach(key => {
    // Skip if value comes from .env file (it's read-only)
    if (process.env[key] !== undefined) {
      return;
    }
    settingsContent += `${key}=${settings[key]}\n`;
  });
  
  // Then, add any new variables from DEFAULT_SETTINGS that aren't in .settings
  DEFAULT_SETTINGS.forEach(({ key, value }) => {
    // Skip if value comes from .env file (it's read-only)
    if (process.env[key] !== undefined) {
      return;
    }
    
    // If this key doesn't exist in .settings, add it with default value
    if (settings[key] === undefined) {
      settings[key] = value;
      settingsContent += `${key}=${value}\n`;
      hasChanges = true;
    }
  });
  
  // Write .settings file if it didn't exist or if we added new defaults
  if (!fileExists || hasChanges) {
    fs.writeFileSync(settingsPath, settingsContent);
    if (hasChanges) {
      console.log('Added new variables to .settings file');
    } else {
      console.log('Created .settings file with default values');
    }
  }
  
  // Return merged settings (existing + new defaults)
  return settings;
}

// Load settings
const runtimeSettings = loadSettings();

// Helper function to get value from process.env, then .settings, then default
function getConfigValue(key, defaultValue) {
  // Priority: process.env (from .env file) > .settings file > default value
  if (process.env[key] !== undefined) {
    return process.env[key];
  }
  if (runtimeSettings[key] !== undefined) {
    return runtimeSettings[key];
  }
  return defaultValue;
}

// Build config object
// Priority: process.env (.env file) > .settings file > hardcoded defaults
const config = {
  // Get from .env first, then .settings, then default
  port: parseInt(getConfigValue('port', 5783)),
  logging: getConfigValue('logging', 'false') === 'true' || getConfigValue('logging', false) === true,
  logger: getConfigValue('logger', 'file'),
  env: getConfigValue('env', 'production'),
  install_date: getConfigValue('install_date', new Date().toISOString()),
  update_url: getConfigValue('update_url', 'https://gitlab.com/api/v4/projects/62990895/packages/generic/openmenu/release'),
  CI_PROJECT_ID: parseInt(getConfigValue('CI_PROJECT_ID', 62990895)),
  SERVER_IP: getConfigValue('SERVER_IP', 'localhost'),
  printer: (() => {
    const printerValue = getConfigValue('printer', null);
    if (printerValue) {
      try {
        const parsed = typeof printerValue === 'string' ? JSON.parse(printerValue) : printerValue;
        // Ensure new fields have defaults if not present
        return {
          printer: parsed.printer || '',
          paper: parsed.paper || '58mm',
          width: parsed.width || 58,
          height: parsed.height || 200,
          fontSize: parsed.fontSize || 12,
          silentPrinting: parsed.silentPrinting !== undefined ? parsed.silentPrinting : false,
          numberOfPrints: parsed.numberOfPrints || 1
        };
      } catch (e) {
        return {
          printer: '',
          paper: '58mm',
          width: 58,
          height: 200,
          fontSize: 12,
          silentPrinting: false,
          numberOfPrints: 1
        };
      }
    }
    return {
      printer: '',
      paper: '58mm',
      width: 58,
      height: 200,
      fontSize: 12,
      silentPrinting: false,
      numberOfPrints: 1
    };
  })()
};

// Export function to update all settings (for settings page)
// Note: Cannot update settings that are defined in .env file (they are read-only)
config.updateAllSettings = function(newSettings) {
  // Read current .settings file
  let currentSettings = {};
  
  if (fs.existsSync(settingsPath)) {
    try {
      const content = fs.readFileSync(settingsPath, 'utf8');
      currentSettings = dotenv.parse(content);
    } catch (error) {
      console.error('Error reading .settings file:', error);
    }
  }
  
  // Merge new settings with current settings
  Object.keys(newSettings).forEach(key => {
    // Check if this setting is defined in .env file - if so, skip it (read-only)
    if (process.env[key] !== undefined) {
      console.warn(`Cannot update ${key} - it is defined in .env file and is read-only`);
      return;
    }
    
    // Update the setting
    const value = newSettings[key];
    const valueToStore = typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
    currentSettings[key] = valueToStore;
  });
  
  // Write all settings back to file (excluding values that are in .env)
  let settingsContent = '';
  Object.keys(currentSettings).forEach(key => {
    // Skip if value comes from .env file (it's read-only)
    if (process.env[key] !== undefined) {
      return;
    }
    settingsContent += `${key}=${currentSettings[key]}\n`;
  });
  
  fs.writeFileSync(settingsPath, settingsContent);
  
  // Reload settings to update runtime config
  const updatedSettings = loadSettings();
  Object.keys(updatedSettings).forEach(key => {
    if (process.env[key] === undefined) {
      if (key === 'printer') {
        try {
          this[key] = typeof updatedSettings[key] === 'string' ? JSON.parse(updatedSettings[key]) : updatedSettings[key];
        } catch (e) {
          this[key] = updatedSettings[key];
        }
      } else {
        this[key] = updatedSettings[key];
      }
    }
  });
  
  console.log('Updated .settings file with all changes');
  return true;
};

// Export function to update a single setting (for backward compatibility)
config.updateSetting = function(key, value) {
  return config.updateAllSettings({ [key]: value });
};

// Export function to get all settings from .settings file
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

// Export function to get DEFAULT_SETTINGS (single source of truth)
config.getDefaultSettings = function() {
  return DEFAULT_SETTINGS;
};

config.getSettingsPath = function() {
  return settingsPath;
};

module.exports = config;
