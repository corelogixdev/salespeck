"use strict";
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const Taxes = sequelize.define(
    "taxes",
    {
      id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        defaultValue: () => generateId(32)
      },
      name: DataTypes.STRING,
      percentage: DataTypes.FLOAT,
      source: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      tablename: "taxes",
      hooks: {
        beforeCreate: (tax) => {
          if (!tax.id) {
            tax.id = generateId(32);
          }
        }
      }
    }
  );
  Taxes.associate = function (models) {
    Taxes.hasMany(models.product, {
      foreignKey: "taxid",
      as: "product",
    });
  };
  return Taxes;
};
