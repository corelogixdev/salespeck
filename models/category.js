'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'category',
    timestamps: true,
  });

  Category.associate = function(models) {
    Category.belongsTo(models.user, { foreignKey: 'createdby', as: 'CreatedBy' });
    Category.belongsTo(models.user, { foreignKey: 'updatedby', as: 'UpdatedBy' });
    Category.hasMany(models.product, { foreignKey: 'category', as: 'Products' });
  };

  return Category;
};
