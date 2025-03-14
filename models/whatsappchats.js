"use strict";
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const WappChat = sequelize.define(
    "WappChat",
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
      staff_id: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      template_id: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      conversation_id: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      meta_wapp_message_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      client_id: {
        type: DataTypes.INTEGER,
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
      file: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      message_body: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      direction: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      source: {
        type: DataTypes.STRING(20),
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
      tableName: "wapp_chats",
      timestamps: true, // This maps `created_at` and `updated_at` automatically
      underscored: true, // Matches snake_case column names
      hooks: {
        beforeCreate: (wappChat) => {
          if (!wappChat.id) {
            wappChat.id = generateId(32);
          }
        }
      }
    }
  );

  WappChat.associate = function (models) {
    // WappChat.belongsTo(models.WappTemplate, {
    //   foreignKey: "template_id",
    //   as: "template",
    // });
  };

  return WappChat;
};
