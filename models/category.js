'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      // define association here
      this.hasMany(Product, { foreignKey: 'categoryId' });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      desc: DataTypes.TEXT,
      image: DataTypes.STRING,
      path: DataTypes.STRING,
      parentId: DataTypes.INTEGER,
      level: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
};
