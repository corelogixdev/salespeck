'use strict';
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const FinanceAccount = sequelize.define('financeaccount', {
    id: {
      type: DataTypes.STRING(32),
      primaryKey: true,
      defaultValue: () => generateId(32)
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
    tableName: 'financeaccount',
    timestamps: true,
    hooks: {
      beforeCreate: (financeAccount) => {
        if (!financeAccount.id) {
          financeAccount.id = generateId(32);
        }
      }
    }
  });

  FinanceAccount.associate = function(models) {
    FinanceAccount.belongsTo(models.financeaccount, { foreignKey: 'fk_parent_in_financeaccount', as: 'parent' });
  };

  return FinanceAccount;
};