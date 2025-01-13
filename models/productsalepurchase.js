'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductSalePurchase = sequelize.define('productsalepurchase', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fk_product_in_productsalepurchase: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fk_financetransaction_in_productsalepurchase: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'productsalepurchase',
    timestamps: true,
  });

  ProductSalePurchase.associate = function(models) {
    ProductSalePurchase.belongsTo(models.product, { foreignKey: 'fk_product_in_productsalepurchase', as: 'product' });
    ProductSalePurchase.belongsTo(models.financetransaction, { foreignKey: 'fk_financetransaction_in_productsalepurchase', as: 'financeTransaction' });
  };

  return ProductSalePurchase;
};