'use strict';
module.exports = (sequelize, DataTypes) => {
  const FinanceTransaction = sequelize.define('financetransaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    details: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    fk_user_createdby_in_financetransaction: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fk_user_targetto_in_financetransaction: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fk_financeaccount_in_financetransaction: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'financetransaction',
    timestamps: true,
  });

  FinanceTransaction.associate = function(models) {
    FinanceTransaction.belongsTo(models.user, { foreignKey: 'fk_user_createdby_in_financetransaction', as: 'createdBy' });
    FinanceTransaction.belongsTo(models.user, { foreignKey: 'fk_user_targetto_in_financetransaction', as: 'targetTo' });
    FinanceTransaction.belongsTo(models.financeaccount, { foreignKey: 'fk_financeaccount_in_financetransaction', as: 'financeAccount' });
  };

  return FinanceTransaction;
};