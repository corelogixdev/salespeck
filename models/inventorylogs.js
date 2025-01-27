"use strict";
module.exports = (sequelize, DataTypes) => {
  const InventoryLogs = sequelize.define(
    "inventorylogs",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedby: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendor: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
      tableName: "inventorylogs",
      timestamps: true,
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
