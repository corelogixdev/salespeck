"use strict";
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const UserPermissions = sequelize.define(
    "userpermissions",
    {
      id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        defaultValue: () => generateId(32)
      },
      user_id: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      permission_id: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
    },
    {
      tableName: "userpermissions",
      timestamps: true,
      hooks: {
        beforeCreate: (userPermission) => {
          if (!userPermission.id) {
            userPermission.id = generateId(32);
          }
        }
      }
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
