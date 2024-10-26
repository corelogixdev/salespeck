'use strict';
module.exports = (sequelize, DataTypes) => {
  const CashClosing = sequelize.define('cashclosing', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    closingbalance: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expence: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    sale: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fk_user_in_cashclosing: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'cashclosing',
    timestamps: false,
  });

  CashClosing.associate = function(models) {
    CashClosing.belongsTo(models.user, { foreignKey: 'fk_user_in_cashclosing', as: 'user' });
  };

  return CashClosing;
};