"use strict";
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define(
    "permissions",
    {
      id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        defaultValue: () => generateId(32)
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      tableName: "permissions",
      timestamps: true,
      hooks: {
        beforeCreate: (permission) => {
          if (!permission.id) {
            permission.id = generateId(32);
          }
        }
      }
    }
  );
  return Permissions;
};
