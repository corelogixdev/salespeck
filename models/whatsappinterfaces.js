"use strict";
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const SiteSmediaWappInterface = sequelize.define(
    "SiteSmediaWappInterface",
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
      wapp_cellno_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      wapp_waba_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      access_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      long_term_access_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.CHAR(1),
        allowNull: true,
      },
      expiry_date: {
        type: DataTypes.DATE,
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
      tableName: "site_smedia_wapp_interfaces",
      timestamps: true, // Automatically handle `created_at` and `updated_at`
      underscored: true, // Use snake_case for database column names
      hooks: {
        beforeCreate: (wappInterface) => {
          if (!wappInterface.id) {
            wappInterface.id = generateId(32);
          }
        }
      }
    }
  );

  SiteSmediaWappInterface.associate = function (models) {
    // Foreign key to the `sites` table
    // SiteSmediaWappInterface.belongsTo(models.Site, {
    //   foreignKey: "site_id",
    //   as: "Site",
    // });
  };

  return SiteSmediaWappInterface;
};
