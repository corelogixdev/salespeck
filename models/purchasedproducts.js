"use strict";
module.exports = (sequelize, DataTypes) => {
  const PurchasedProducts = sequelize.define(
    "purchasedproducts",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      purchase: DataTypes.INTEGER,
      product: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      totalAmount: DataTypes.FLOAT,
    },
    {
      timestamps: true,
      tablename: "purchasedproducts",
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
