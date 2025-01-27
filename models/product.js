'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    barcode: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    brand: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    carrycost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    category: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'product',
    timestamps: false,
  });
  Product.associate = function (models) {
    Product.belongsTo(models.taxes, { foreignKey: 'taxid', as: 'Tax' });
    Product.belongsTo(models.user, { foreignKey: 'createdby', as: 'CreatedBy' });
    Product.belongsTo(models.user, { foreignKey: 'updatedby', as: 'UpdatedBy' });
    Product.hasMany(models.inventorylogs, {
      foreignKey: 'product_id',
      as: 'InventoryLogs'
    });
  };
  return Product;
};
