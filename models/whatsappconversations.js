"use strict";
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const WappConversation = sequelize.define(
    "WappConversation",
    {
      id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        defaultValue: () => generateId(32)
      },
      site_id: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      client_id: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      client_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      client_number: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "wapp_conversations",
      timestamps: true,
      underscored: true,
      hooks: {
        beforeCreate: (wappConversation) => {
          if (!wappConversation.id) {
            wappConversation.id = generateId(32);
          }
        }
      }
    }
  );

  return WappConversation;
};
