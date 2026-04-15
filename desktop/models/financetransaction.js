'use strict';
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const FinanceTransaction = sequelize.define('financetransaction', {
    id: {
      type: DataTypes.STRING(32),
      primaryKey: true,
      defaultValue: () => generateId(32)
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
    source: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    fk_user_targetto_in_financetransaction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fk_financeaccount_in_financetransaction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'financetransaction',
    timestamps: true,
    hooks: {
      beforeCreate: (financeTransaction) => {
        if (!financeTransaction.id) {
          financeTransaction.id = generateId(32);
        }
      }
    }
  });

  FinanceTransaction.associate = function(models) {
    FinanceTransaction.belongsTo(models.user, { foreignKey: 'createdby', as: 'createdBy' });
    FinanceTransaction.belongsTo(models.user, { foreignKey: 'updatedby', as: 'updatedBy' });
    FinanceTransaction.belongsTo(models.user, { foreignKey: 'fk_user_targetto_in_financetransaction', as: 'targetTo' });
    FinanceTransaction.belongsTo(models.financeaccount, { foreignKey: 'fk_financeaccount_in_financetransaction', as: 'financeAccount' });
  };

  return FinanceTransaction;
};