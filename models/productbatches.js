"use strict";
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const ProductBatches = sequelize.define(
    "productbatches",
    {
      id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        defaultValue: () => generateId(32)
      },
      product: {
        type: DataTypes.STRING,
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
      source: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      tableName: "productbatces",
      timestamps: true,
      hooks: {
        beforeCreate: (productBatch) => {
          if (!productBatch.id) {
            productBatch.id = generateId(32);
          }
        }
      }
    }
  );
  ProductBatches.associate = function (models) {
    ProductBatches.belongsTo(models.product, { foreignKey: "product", as: 'batch' });
  };
  return ProductBatches;
};
