"use strict";

module.exports = (sequelize, DataTypes) => {
  const SiteSmediaWappInterface = sequelize.define(
    "SiteSmediaWappInterface",
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
      wapp_cellno_id: {
        type: DataTypes.STRING(255),
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
