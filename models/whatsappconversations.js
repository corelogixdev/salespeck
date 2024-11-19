"use strict";

module.exports = (sequelize, DataTypes) => {
  const WappConversation = sequelize.define(
    "WappConversation",
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
      timestamps: true, // This enables automatic handling of `created_at` and `updated_at`
      underscored: true, // Maps snake_case column names in the database
    }
  );

  return WappConversation;
};
