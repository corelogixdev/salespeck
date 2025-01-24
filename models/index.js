'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
exports.env = env;
const config = require('../config');
const dbConfig = require('../config/config.json')[env];
exports.config = dbConfig;

const db = {};
if(config.env === 'production') {
  let appDataPath = process.env.APPDATA || 
  (process.platform === 'darwin' 
      ? path.join(os.homedir(), 'Library', 'Application Support') 
      : path.join(os.homedir(), '.config'));
  const dbFilePath = path.join(appDataPath, 'openmenu', 'database.sqlite');
  dbConfig.storage = dbFilePath;
}
let sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Set timestamps globally
sequelize.options.define = {
  timestamps: true
};

sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Error synchronizing database:', err);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
