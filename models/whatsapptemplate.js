"use strict";

module.exports = (sequelize, DataTypes) => {
  const whatsapptemplate = sequelize.define(
    "whatsapptemplate",
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
      meta_wapp_template_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      components: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.CHAR(1),
        allowNull: true,
      },
      meta_wapp_template_status: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      meta_wapp_template_response: {
        type: DataTypes.TEXT,
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
      tableName: "wapp_templates",
      timestamps: true, // Enables Sequelize's automatic handling of `created_at` and `updated_at`
      underscored: true, // Ensures Sequelize maps snake_case column names
    }
  );

  return whatsapptemplate;
};
