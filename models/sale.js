"use strict";
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "sale",
    {
      id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        defaultValue: () => generateId(32)
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
      },
      totalprice: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      totalpayment: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      createdby: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      updatedby: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: "sale",
      timestamps: true,
      hooks: {
        beforeCreate: (sale) => {
          if (!sale.id) {
            sale.id = generateId(32);
          }
        }
      }
    }
  );

  Sale.associate = function (models) {
    Sale.hasMany(models.soldproducts, { foreignKey: 'sale', as: 'SoldPoducts' });
    Sale.belongsTo(models.user , { foreignKey: 'user', as: 'User' });
    Sale.belongsTo(models.user , { foreignKey: 'customer', as: 'Customer' });
    Sale.belongsTo(models.user , { foreignKey: 'deliveryuser', as: 'DeliveryUser' });
  };

  return Sale;
};
