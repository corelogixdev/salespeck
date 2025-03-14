'use strict';
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.STRING(32),
      primaryKey: true,
      defaultValue: () => generateId(32)
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    account_key: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    firstname: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    phone2: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: 'user',
    },
    createdby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: 'desktop'
    },
  }, {
    tableName: 'user',
    timestamps: true,
    hooks: {
      beforeCreate: (user) => {
        if (!user.id) {
          user.id = generateId(32);
        }
      }
    }
  });

  return User;
};