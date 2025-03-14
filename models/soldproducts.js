"use strict";
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const SoldProducts = sequelize.define(
    "soldproducts",
    {
      id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        defaultValue: () => generateId(32)
      },
      sale: DataTypes.STRING,
      product: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {
      timestamps: true,
      tablename: 'soldproducts',
      hooks: {
        beforeCreate: (soldProduct) => {
          if (!soldProduct.id) {
            soldProduct.id = generateId(32);
          }
        }
      }
    }
  );
  SoldProducts.associate = function (models) {
    SoldProducts.belongsTo(models.sale, { foreignKey: 'sale', as: 'Sale' });
    SoldProducts.belongsTo(models.product, { foreignKey: 'product', as: 'Product' });
  };
  return SoldProducts;
};
