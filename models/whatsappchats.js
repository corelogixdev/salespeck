"use strict";

module.exports = (sequelize, DataTypes) => {
  const WappChat = sequelize.define(
    "WappChat",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      site_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      staff_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      template_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      conversation_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      meta_wapp_message_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      client_id: {
        type: DataTypes.INTEGER.UNSIGNED,
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
    }
  );

  WappChat.associate = function (models) {
    WappChat.belongsTo(models.WappTemplate, {
      foreignKey: "template_id",
      as: "template",
    });
  };

  return WappChat;
};
