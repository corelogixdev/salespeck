'use strict';
module.exports = (sequelize, DataTypes) => {
  const FinanceAccount = sequelize.define('financeaccount', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    fk_parent_in_financeaccount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'financeaccount',
    timestamps: false,
  });

  FinanceAccount.associate = function(models) {
    FinanceAccount.belongsTo(models.financeaccount, { foreignKey: 'fk_parent_in_financeaccount', as: 'parent' });
  };

  return FinanceAccount;
};