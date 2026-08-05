const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const dotenv = require('dotenv');
const os = require('os');

// Default runtime settings (for .settings file)
// Note: session_secret is generated on first run and is NOT listed here (not shown on Settings UI).
const DEFAULT_SETTINGS = [
  { key: 'install_date', value: new Date().toISOString() },
  { key: 'update_url', value: 'https://gitlab.com/api/v4/projects/62990895/packages/generic/stitchcore/release' },
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

const HIDDEN_SETTINGS_KEYS = new Set(['session_secret']);

function generateSessionSecret() {
  return crypto.randomBytes(48).toString('hex');
}

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
    const settingsDir = path.join(appDataPath, 'stitchcore');
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

function writeSettingsFile(settings) {
  let settingsContent = '';
  Object.keys(settings).forEach((key) => {
    if (process.env[key] !== undefined) {
      return;
    }
    settingsContent += `${key}=${settings[key]}\n`;
  });
  fs.writeFileSync(settingsPath, settingsContent);
}

// Load or create .settings file (runtime settings)
// Note: Values from .env file (process.env) take precedence over .settings file
function loadSettings() {
  let settings = {};
  let fileExists = fs.existsSync(settingsPath);

  if (fileExists) {
    try {
      const content = fs.readFileSync(settingsPath, 'utf8');
      settings = dotenv.parse(content);
      console.log('Loaded existing .settings file');
    } catch (error) {
      console.error('Error reading .settings file:', error);
      settings = {};
    }
  } else {
    console.log('Creating .settings file with default values...');
  }

  let hasChanges = !fileExists;

  DEFAULT_SETTINGS.forEach(({ key, value }) => {
    if (process.env[key] !== undefined) {
      return;
    }
    if (settings[key] === undefined) {
      settings[key] = value;
      hasChanges = true;
    }
  });

  // Per-install session secret (never ship a shared hardcoded secret)
  const envSecret = process.env.session_secret || process.env.SESSION_SECRET;
  if (envSecret) {
    settings.session_secret = envSecret;
  } else if (!settings.session_secret || settings.session_secret === 'your-secret') {
    settings.session_secret = generateSessionSecret();
    hasChanges = true;
    console.log('Generated new session_secret for this install');
  }

  if (hasChanges) {
    writeSettingsFile(settings);
    if (!fileExists) {
      console.log('Created .settings file with default values');
    } else {
      console.log('Updated .settings file (new defaults and/or session_secret)');
    }
  }

  return settings;
}

const runtimeSettings = loadSettings();

function getConfigValue(key, defaultValue) {
  if (process.env[key] !== undefined) {
    return process.env[key];
  }
  if (key === 'session_secret' && process.env.SESSION_SECRET !== undefined) {
    return process.env.SESSION_SECRET;
  }
  if (runtimeSettings[key] !== undefined) {
    return runtimeSettings[key];
  }
  return defaultValue;
}

const config = {
  port: parseInt(getConfigValue('port', 5783)),
  logging: getConfigValue('logging', 'false') === 'true' || getConfigValue('logging', false) === true,
  logger: getConfigValue('logger', 'file'),
  env: getConfigValue('env', 'production'),
  install_date: getConfigValue('install_date', new Date().toISOString()),
  update_url: getConfigValue('update_url', 'https://gitlab.com/api/v4/projects/62990895/packages/generic/stitchcore/release'),
  CI_PROJECT_ID: parseInt(getConfigValue('CI_PROJECT_ID', 62990895)),
  SERVER_IP: getConfigValue('SERVER_IP', 'localhost'),
  session_secret: getConfigValue('session_secret', generateSessionSecret()),
  printer: (() => {
    const printerValue = getConfigValue('printer', null);
    if (printerValue) {
      try {
        const parsed = typeof printerValue === 'string' ? JSON.parse(printerValue) : printerValue;
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

config.updateAllSettings = function(newSettings) {
  let currentSettings = {};

  if (fs.existsSync(settingsPath)) {
    try {
      const content = fs.readFileSync(settingsPath, 'utf8');
      currentSettings = dotenv.parse(content);
    } catch (error) {
      console.error('Error reading .settings file:', error);
    }
  }

  Object.keys(newSettings).forEach(key => {
    if (HIDDEN_SETTINGS_KEYS.has(key)) {
      return;
    }
    if (process.env[key] !== undefined) {
      console.warn(`Cannot update ${key} - it is defined in .env file and is read-only`);
      return;
    }

    const value = newSettings[key];
    const valueToStore = typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
    currentSettings[key] = valueToStore;
  });

  if (!currentSettings.session_secret && runtimeSettings.session_secret) {
    currentSettings.session_secret = runtimeSettings.session_secret;
  }

  writeSettingsFile(currentSettings);

  const updatedSettings = loadSettings();
  Object.keys(updatedSettings).forEach(key => {
    if (process.env[key] === undefined) {
      if (key === 'printer') {
        try {
          this[key] = typeof updatedSettings[key] === 'string' ? JSON.parse(updatedSettings[key]) : updatedSettings[key];
        } catch (e) {
          this[key] = updatedSettings[key];
        }
      } else if (!HIDDEN_SETTINGS_KEYS.has(key) || key === 'session_secret') {
        this[key] = updatedSettings[key];
      }
    }
  });

  console.log('Updated .settings file with all changes');
  return true;
};

config.updateSetting = function(key, value) {
  return config.updateAllSettings({ [key]: value });
};

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

config.getDefaultSettings = function() {
  return DEFAULT_SETTINGS.filter(({ key }) => !HIDDEN_SETTINGS_KEYS.has(key));
};

config.getSettingsPath = function() {
  return settingsPath;
};

module.exports = config;
