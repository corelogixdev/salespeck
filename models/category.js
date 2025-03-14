'use strict';
const { generateId } = require('../utils/idGenerator');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
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
  }, {
    tableName: 'category',
    timestamps: true,
    hooks: {
      beforeCreate: (category) => {
        if (!category.id) {
          category.id = generateId(32);
        }
      }
    }
  });

  Category.associate = function(models) {
    Category.belongsTo(models.user, { foreignKey: 'createdby', as: 'CreatedBy' });
    Category.belongsTo(models.user, { foreignKey: 'updatedby', as: 'UpdatedBy' });
    Category.hasMany(models.product, { foreignKey: 'category', as: 'Products' });
  };

  return Category;
};
