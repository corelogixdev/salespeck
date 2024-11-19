"use strict";
module.exports = (sequelize, DataTypes) => {
  const SoldProducts = sequelize.define(
    "soldproducts",
    {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      sale: DataTypes.INTEGER,
      product: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
        timestamps: true,
        tablename: 'soldproducts'
    }
  );
  SoldProducts.associate = function (models) {
    SoldProducts.belongsTo(models.sale, { foreignKey: 'sale', as: 'Sale' });
    SoldProducts.belongsTo(models.product, { foreignKey: 'product', as: 'Product' });
  };
  return SoldProducts;
};
