"use strict";
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const Purchases = sequelize.define(
    "purchase",
    {
      id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        defaultValue: () => generateId(32)
      },
      createdby: DataTypes.STRING,
      updatedby: DataTypes.STRING,
      vendor: DataTypes.STRING,
      totalAmount: DataTypes.FLOAT,
      totalPayment: DataTypes.FLOAT,
      invoicenum: DataTypes.STRING,
      source: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      tablename: "purchase",
      hooks: {
        beforeCreate: (purchase) => {
          if (!purchase.id) {
            purchase.id = generateId(32);
          }
        }
      }
    }
  );

  Purchases.associate = function(models){
    Purchases.belongsTo(models.user, {  
      foreignKey: 'createdby',
      as: 'Creator'
    });
    Purchases.belongsTo(models.user, {
      foreignKey: 'vendor',
      as: 'Vendor'
    });
    Purchases.hasMany(models.purchasedproducts, {
      foreignKey: 'purchase',
      as: 'PurchasedItems'  // Changed alias
    });
  };

  return Purchases;
};
