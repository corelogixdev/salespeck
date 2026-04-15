'use strict';
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.STRING(32),
      primaryKey: true,
      defaultValue: () => generateId(32)
    },
    barcode: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    carrycost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ispurchaseable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    issaleable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    purchaseactive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    purchaseprice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    saleactive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    saleprice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    taxid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: 'desktop'
    },
  }, {
    tableName: 'product',
    timestamps: false,
    hooks: {
      beforeCreate: (product) => {
        if (!product.id) {
          product.id = generateId(32);
        }
      }
    }
  });
  
  Product.associate = function (models) {
    Product.belongsTo(models.taxes, { foreignKey: 'taxid', as: 'Tax' });
    Product.belongsTo(models.user, { foreignKey: 'createdby', as: 'CreatedBy' });
    Product.belongsTo(models.user, { foreignKey: 'updatedby', as: 'UpdatedBy' });
    Product.hasMany(models.inventorylogs, {
      foreignKey: 'product_id',
      as: 'InventoryLogs'
    });
    Product.belongsTo(models.brand, { foreignKey: 'brand', as: 'Brand' });
    Product.hasMany(models.productbatches, {
      foreignKey: 'product',
      as: 'Batch'
    });
    Product.belongsTo(models.category, {
      foreignKey: 'category',
      as: 'Category'
    });
  };
  
  return Product;
};
