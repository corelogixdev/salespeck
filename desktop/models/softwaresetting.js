'use strict';
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const SoftwareSetting = sequelize.define('softwaresetting', {
    id: {
      type: DataTypes.STRING(32),
      primaryKey: true,
      defaultValue: () => generateId(32)
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  }, {
    tableName: 'softwaresetting',
    timestamps: false,
    hooks: {
      beforeCreate: (setting) => {
        if (!setting.id) {
          setting.id = generateId(32);
        }
      }
    }
  });

  return SoftwareSetting;
};