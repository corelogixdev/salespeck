"use strict";
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const InventoryLogs = sequelize.define(
    "inventorylogs",
    {
      id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        defaultValue: () => generateId(32)
      },
      product_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdby: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updatedby: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      source: {
        type: DataTypes.STRING(20),
        allowNull: true,
      }
    },
    {
      tableName: "inventorylogs",
      timestamps: true,
      hooks: {
        beforeCreate: (inventoryLog) => {
          if (!inventoryLog.id) {
            inventoryLog.id = generateId(32);
          }
        }
      }
    }
  );

  InventoryLogs.associate = (models) => {
    InventoryLogs.belongsTo(models.product, {
      foreignKey: 'product_id',
      as: 'Product'
    });
    InventoryLogs.belongsTo(models.user, {
      foreignKey: 'createdby',
      as: 'User'
    });
  };

  return InventoryLogs;
};
