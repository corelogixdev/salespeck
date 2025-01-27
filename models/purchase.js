"use strict";
module.exports = (sequelize, DataTypes) => {
  const Purchases = sequelize.define(
    "purchase",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      createdby: DataTypes.INTEGER,
      updatedby: DataTypes.INTEGER,
      vendor: DataTypes.INTEGER,
      totalAmount: DataTypes.FLOAT,
      totalPayment: DataTypes.FLOAT,
      invoicenum: DataTypes.STRING,
    },
    {
      timestamps: true,
      tablename: "purchase",
    }
  );

  Purchases.associate = function(models){
    Purchases.belongsTo(models.user, {  
      foreignKey: 'createdby',
      as: 'Creator'
    });
    Purchases.belongsTo(models.user, {
      foreignKey: 'vendor',
      as: 'Vendor'
    });
    Purchases.hasMany(models.purchasedproducts, {
      foreignKey: 'purchase',
      as: 'PurchasedItems'  // Changed alias
    });
  };

  return Purchases;
};
