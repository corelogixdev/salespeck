const path = require('path');
const Sequelize = require('sequelize');
// Use absolute path or relative from this file location
const config = require('../installEnv'); 
const fs = require('fs');

async function run() {
  try {
    const env = config.env || 'production';
    const dbConfig = require('../config/config.json')[env];

    let storage = dbConfig.storage;
    if (config.env === 'production') {
        const os = require('os');
        let appDataPath = process.env.APPDATA || 
        (process.platform === 'darwin' 
            ? path.join(os.homedir(), 'Library', 'Application Support') 
            : path.join(os.homedir(), '.config'));
        storage = path.join(appDataPath, 'openmenu', 'database.sqlite');
    } else {
        // Resolve relative path if needed, usually relative to project root
        // If storage starts with ./, it's relative to CWD
        if (storage.startsWith('./')) {
            storage = path.join(__dirname, '..', storage);
        }
    }
    
    console.log(`Using database at: ${storage}`);

    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: storage,
        logging: console.log
    });

    await sequelize.authenticate();
    
    // Check if column exists
    const [results] = await sequelize.query("PRAGMA table_info(user)");
    const hasColumn = results.some(col => col.name === 'dashboard_config');
    
    if (hasColumn) {
        console.log("Column dashboard_config already exists.");
    } else {
        await sequelize.query("ALTER TABLE user ADD COLUMN dashboard_config TEXT DEFAULT '{}'");
        console.log("Migration successful: Added dashboard_config to user table.");
    }

    await sequelize.close();
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

run();
