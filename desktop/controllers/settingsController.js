const queries = require("../prisma/queries");
const config = require("../installEnv");
const fs = require('fs');
const path = require('path');

exports.index = async (req, res) => {
  // Get database settings
  let dbSettings = await queries.settings.getAllSoftwareSettings();
  let dbSettingsObj = {};
  dbSettings.forEach((setting) => {
    try {
      dbSettingsObj[setting.name] = JSON.parse(setting.value);
    } catch (e) {
      dbSettingsObj[setting.name] = setting.value;
    }
  });
  
  // Get DEFAULT_SETTINGS from installEnv.js (single source of truth)
  // Only show variables that are defined in DEFAULT_SETTINGS
  const defaultSettings = config.getDefaultSettings();
  const allSettingsFromFile = config.getAllSettings();
  
  // Track which variables come from .env (read-only)
  const envOnlyVars = {};
  
  // Build envSettings object - only include variables from DEFAULT_SETTINGS
  // Get values from .settings file (or .env if defined there)
  const envSettings = {};
  
  defaultSettings.forEach(({ key }) => {
    // Check if value comes from .env (it's read-only)
    if (process.env[key] !== undefined) {
      envOnlyVars[key] = true;
      // Get value from .env
      envSettings[key] = process.env[key];
    } else {
      // Get value from .settings file
      const value = allSettingsFromFile[key];
      
      if (key === 'printer') {
        try {
          envSettings[key] = typeof value === 'string' 
            ? JSON.parse(value) 
            : value || {};
        } catch (e) {
          envSettings[key] = {};
        }
      } else if (key === 'logging') {
        envSettings[key] = value === 'true' || value === true;
      } else if (key === 'CI_PROJECT_ID' || key === 'port') {
        envSettings[key] = value !== undefined ? parseInt(value) : (key === 'port' ? 5783 : 62990895);
      } else {
        envSettings[key] = value !== undefined ? value : '';
      }
    }
  });
  
  // Ensure printer object has all required fields
  if (envSettings.printer) {
    envSettings.printer = {
      printer: envSettings.printer.printer || '',
      paper: envSettings.printer.paper || '58mm',
      width: envSettings.printer.width || 58,
      height: envSettings.printer.height || 200,
      fontSize: envSettings.printer.fontSize || 12,
      silentPrinting: envSettings.printer.silentPrinting !== undefined ? envSettings.printer.silentPrinting : false,
      numberOfPrints: envSettings.printer.numberOfPrints || 1
    };
  } else {
    // Default printer if not set
    envSettings.printer = {
      printer: '',
      paper: '58mm',
      width: 58,
      height: 200,
      fontSize: 12,
      silentPrinting: false,
      numberOfPrints: 1
    };
  }
  
  // Load translations from en.json
  let translations = {};
  try {
    const langPath = path.join(__dirname, '..', 'assets', 'lang', 'en.json');
    const langContent = fs.readFileSync(langPath, 'utf8');
    translations = JSON.parse(langContent);
  } catch (error) {
    console.error('Error loading translations:', error);
  }
  
  let currenttab = req.query.currenttab || 'env';
  if (currenttab !== 'env' && currenttab !== 'db' && currenttab !== 'dashboard') {
    currenttab = 'env';
  }
  
  // Get dashboard config for current user
  let dashboardConfig = {};
  if (req.session.user_id) {
    const currentUser = await queries.users.findById(req.session.user_id);
    if (currentUser && currentUser.dashboard_config) {
        try {
            dashboardConfig = JSON.parse(currentUser.dashboard_config);
        } catch (e) {
            console.error("Error parsing dashboard config:", e);
        }
    }
  }

  // Consume session message if exists
  const message = req.session.message;
  req.session.message = null;

  res.render("settings/index", { 
    envSettings, 
    dbSettings: dbSettingsObj, 
    currenttab,
    dashboardConfig,
    message,
    translations: translations.envSettings || {},
    envOnlyVars: envOnlyVars || {}
  });
};

exports.save = async (req, res) => {
  let tabType = req.query.type; // 'env' or 'db'
  let settingName = req.query.name; // For db settings only
  
  if (tabType === 'env') {
    // Get DEFAULT_SETTINGS (single source of truth) - only save variables that are defined there
    const defaultSettings = config.getDefaultSettings();
    const currentSettings = config.getAllSettings();
    
    // Build updated settings object - only include variables from DEFAULT_SETTINGS
    const updatedSettings = {};
    
    // Handle printer settings (comes as printer[field] from form)
    const printerSettings = {};
    Object.keys(req.body).forEach(key => {
      if (key.startsWith('printer[')) {
        // Extract field name from printer[field] format
        const fieldName = key.match(/printer\[(.+)\]/)[1];
        printerSettings[fieldName] = req.body[key];
      }
    });
    
    // Update printer settings if any were provided
    if (Object.keys(printerSettings).length > 0) {
      // Get current printer settings
      let currentPrinter = {};
      if (currentSettings.printer) {
        try {
          currentPrinter = typeof currentSettings.printer === 'string' 
            ? JSON.parse(currentSettings.printer) 
            : currentSettings.printer;
        } catch (e) {
          currentPrinter = {};
        }
      }
      
      // Merge with new values
      const mergedSettings = { ...currentPrinter, ...printerSettings };
      
      // Handle silentPrinting checkbox (if not checked, it won't be in req.body)
      if (printerSettings.silentPrinting === undefined) {
        // Checkbox not in form data - keep current value or default to false
        mergedSettings.silentPrinting = currentPrinter.silentPrinting !== undefined ? currentPrinter.silentPrinting : false;
      } else {
        mergedSettings.silentPrinting = printerSettings.silentPrinting === 'true' || printerSettings.silentPrinting === true;
      }
      
      // Ensure numberOfPrints is a number
      if (printerSettings.numberOfPrints !== undefined) {
        mergedSettings.numberOfPrints = parseInt(printerSettings.numberOfPrints) || 1;
      } else {
        mergedSettings.numberOfPrints = currentPrinter.numberOfPrints || 1;
      }
      
      // Ensure width, height, fontSize are numbers
      if (printerSettings.width !== undefined) mergedSettings.width = parseInt(printerSettings.width) || 58;
      if (printerSettings.height !== undefined) mergedSettings.height = parseInt(printerSettings.height) || 200;
      if (printerSettings.fontSize !== undefined) mergedSettings.fontSize = parseInt(printerSettings.fontSize) || 12;
      
      // Store printer as JSON string
      updatedSettings.printer = JSON.stringify(mergedSettings);
    }
    
    // Process only variables that are in DEFAULT_SETTINGS (single source of truth)
    defaultSettings.forEach(({ key }) => {
      // Skip printer, already handled above
      if (key === 'printer') {
        return;
      }
      
      // Check if this variable was submitted in the form
      if (req.body.hasOwnProperty(key)) {
        if (key === 'logging') {
          // Handle checkbox - if checked, value is 'on', otherwise undefined
          updatedSettings[key] = req.body[key] === 'on' || req.body[key] === true || req.body[key] === 'true';
        } else {
          updatedSettings[key] = req.body[key];
        }
      } else {
        // Variable not in form - preserve current value from .settings
        if (currentSettings[key] !== undefined) {
          updatedSettings[key] = currentSettings[key];
        }
      }
    });
    
    // Save all settings at once (only variables from DEFAULT_SETTINGS)
    config.updateAllSettings(updatedSettings);
  } else if (tabType === 'db' && settingName) {
    // Save database settings
    let values = JSON.stringify(req.body);
    await queries.settings.updateSettingByName(settingName, values);
  } else if (tabType === 'dashboard') {
    // Save dashboard settings to User model
    const userId = req.session.user_id; // Use session user_id
    
    if (userId) {
      try {
        await queries.settings.updateUserDashboardConfig(userId, req.body);
        
        // Update session user to reflect changes immediately
        if (req.session.user) {
           req.session.user.dashboard_config = JSON.stringify(req.body); 
        }
      } catch (error) {
        console.error('Error saving dashboard settings:', error);
      }
    }
  }
  
  req.session.message = { type: "success", text: "Settings saved successfully!" };
  res.redirect(`/settings?currenttab=${tabType}`);
};