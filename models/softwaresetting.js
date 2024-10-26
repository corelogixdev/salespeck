'use strict';
module.exports = (sequelize, DataTypes) => {
  const SoftwareSetting = sequelize.define('softwaresetting', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    valuetype: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    stringvalue: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    intvalue: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    boolvalue: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    floatvalue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    datevalue: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'softwaresetting',
    timestamps: false,
  });

  return SoftwareSetting;
};