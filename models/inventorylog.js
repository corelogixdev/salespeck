'use strict';
module.exports = (sequelize, DataTypes) => {
  const InventoryLog = sequelize.define('inventorylog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    note: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fk_product_in_inventorylog: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'inventorylog',
    timestamps: false,
  });

  InventoryLog.associate = function(models) {
    InventoryLog.belongsTo(models.product, { foreignKey: 'fk_product_in_inventorylog', as: 'product' });
  };

  return InventoryLog;
};