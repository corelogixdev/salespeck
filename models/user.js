'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    name: {
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'user',
    timestamps: false,
  });

  return User;
};