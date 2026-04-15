'use strict';
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const CashClosing = sequelize.define('cashclosing', {
    id: {
      type: DataTypes.STRING(32),
      primaryKey: true,
      defaultValue: () => generateId(32)
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  }, {
    tableName: 'cashclosing',
    timestamps: true,
    hooks: {
      beforeCreate: (cashClosing) => {
        if (!cashClosing.id) {
          cashClosing.id = generateId(32);
        }
      }
    }
  });

  CashClosing.associate = function(models) {
    CashClosing.belongsTo(models.user, { foreignKey: 'fk_user_in_cashclosing', as: 'user' });
  };

  return CashClosing;
};