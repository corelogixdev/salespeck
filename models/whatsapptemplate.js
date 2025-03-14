"use strict";
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const whatsapptemplate = sequelize.define(
    "whatsapptemplate",
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
      meta_wapp_template_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
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
      timestamps: true,
      underscored: true,
      hooks: {
        beforeCreate: (wappTemplate) => {
          if (!wappTemplate.id) {
            wappTemplate.id = generateId(32);
          }
        }
      }
    }
  );

  return whatsapptemplate;
};
