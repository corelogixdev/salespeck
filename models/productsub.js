'use strict';
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const ProductSub = sequelize.define('productsub', {
    id: {
      type: DataTypes.STRING(32),
      primaryKey: true,
      defaultValue: () => generateId(32)
    },
    fk_product_main_in_productsub: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fk_product_sub_in_productsub: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  }, {
    tableName: 'productsub',
    timestamps: true,
    hooks: {
      beforeCreate: (productSub) => {
        if (!productSub.id) {
          productSub.id = generateId(32);
        }
      }
    }
  });

  ProductSub.associate = function(models) {
    ProductSub.belongsTo(models.product, { foreignKey: 'fk_product_main_in_productsub', as: 'mainProduct' });
    ProductSub.belongsTo(models.product, { foreignKey: 'fk_product_sub_in_productsub', as: 'subProduct' });
  };

  return ProductSub;
};