'use strict';
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('brand', {
    id: {
      type: DataTypes.STRING(32),
      primaryKey: true,
      defaultValue: () => generateId(32)
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: 'desktop'
    },
  }, {
    tableName: 'brand',
    timestamps: true,
    hooks: {
      beforeCreate: (brand) => {
        if (!brand.id) {
          brand.id = generateId(32);
        }
      }
    }
  });

  Brand.associate = function(models) {
    Brand.belongsTo(models.user, { foreignKey: 'createdby', as: 'CreatedBy' });
    Brand.belongsTo(models.user, { foreignKey: 'updatedby', as: 'UpdatedBy' });
    Brand.hasMany(models.product, { foreignKey: 'brand', as: 'Products' });
  };

  return Brand;
};
