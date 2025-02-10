'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('brand', {
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
    }
  }, {
    tableName: 'brand',
    timestamps: true
  });

  Brand.associate = function(models) {
    Brand.belongsTo(models.user, { foreignKey: 'createdby', as: 'CreatedBy' });
    Brand.belongsTo(models.user, { foreignKey: 'updatedby', as: 'UpdatedBy' });
    Brand.hasMany(models.product, { foreignKey: 'brand', as: 'Products' });
  };

  return Brand;
};
