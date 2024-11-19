"use strict";

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "sale",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      customer: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      deliveryuser: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      invoicenum: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      discountpercentage: {
        type: DataTypes.STRING(50),
        allowNull: true,
      }
    },
    {
      tableName: "sale",
      timestamps: true,
    }
  );

  Sale.associate = function (models) {
    Sale.belongsTo(models.user , { foreignKey: 'user', as: 'User' });
    Sale.belongsTo(models.user , { foreignKey: 'customer', as: 'Customer' });
    Sale.belongsTo(models.user , { foreignKey: 'deliveryuser', as: 'DeliveryUser' });
  };

  return Sale;
};
