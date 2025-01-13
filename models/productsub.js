'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductSub = sequelize.define('productsub', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_product_main_in_productsub: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fk_product_sub_in_productsub: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  }, {
    tableName: 'productsub',
    timestamps: true,
  });

  ProductSub.associate = function(models) {
    ProductSub.belongsTo(models.product, { foreignKey: 'fk_product_main_in_productsub', as: 'mainProduct' });
    ProductSub.belongsTo(models.product, { foreignKey: 'fk_product_sub_in_productsub', as: 'subProduct' });
  };

  return ProductSub;
};