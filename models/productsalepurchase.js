'use strict';
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const ProductSalePurchase = sequelize.define('productsalepurchase', {
    id: {
      type: DataTypes.STRING(32),
      primaryKey: true,
      defaultValue: () => generateId(32)
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    fk_financetransaction_in_productsalepurchase: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  }, {
    tableName: 'productsalepurchase',
    timestamps: true,
    hooks: {
      beforeCreate: (productSalePurchase) => {
        if (!productSalePurchase.id) {
          productSalePurchase.id = generateId(32);
        }
      }
    }
  });

  ProductSalePurchase.associate = function(models) {
    ProductSalePurchase.belongsTo(models.product, { foreignKey: 'fk_product_in_productsalepurchase', as: 'product' });
    ProductSalePurchase.belongsTo(models.financetransaction, { foreignKey: 'fk_financetransaction_in_productsalepurchase', as: 'financeTransaction' });
  };

  return ProductSalePurchase;
};