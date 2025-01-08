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
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'softwaresetting',
    timestamps: false,
  });

  return SoftwareSetting;
};