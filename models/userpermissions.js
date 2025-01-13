"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserPermissions = sequelize.define(
    "userpermissions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      permission_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "userpermissions",
      timestamps: true,
    }
  );
  UserPermissions.associate = function (models) {
    UserPermissions.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user",
    });
    UserPermissions.belongsTo(models.permissions, {
      foreignKey: "permission_id",
      as: "permission",
    });
  };
  return UserPermissions;
};
