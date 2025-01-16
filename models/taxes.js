"use strict";
module.exports = (sequelize, DataTypes) => {
  const Taxes = sequelize.define(
    "taxes",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      percentage: DataTypes.FLOAT,
    },
    {
      timestamps: true,
      tablename: "taxes",
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
