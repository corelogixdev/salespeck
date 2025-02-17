"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductBatches = sequelize.define(
    "productbatches",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      expirydate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      tableName: "productbatces",
      timestamps: true,
    }
  );
  ProductBatches.associate = function (models) {
    ProductBatches.belongsTo(models.product, { foreignKey: "product", as: 'batch' });
  };
  return ProductBatches;
};
