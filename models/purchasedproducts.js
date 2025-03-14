"use strict";
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const PurchasedProducts = sequelize.define(
    "purchasedproducts",
    {
      id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        defaultValue: () => generateId(32)
      },
      purchase: DataTypes.STRING,
      product: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      totalAmount: DataTypes.FLOAT,
      source: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      tablename: "purchasedproducts",
      hooks: {
        beforeCreate: (purchasedProduct) => {
          if (!purchasedProduct.id) {
            purchasedProduct.id = generateId(32);
          }
        }
      }
    }
  );
  PurchasedProducts.associate = function (models) {
    PurchasedProducts.belongsTo(models.purchase, {
      foreignKey: "purchase",
      as: "Purchase",
    });
    PurchasedProducts.belongsTo(models.product, {
      foreignKey: "product",
      as: "Product",
    });
  };
  return PurchasedProducts;
};
