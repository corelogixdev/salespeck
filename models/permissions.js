"use strict";
module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define(
    "permissions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      tableName: "permissions",
      timestamps: true,
    }
  );
  return Permissions;
};
