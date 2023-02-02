'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, Attribute}) {
      // define association here
      this.belongsTo(Product, {foreignKey: 'productId'})
      this.belongsTo(Attribute,{foreignKey: 'attributeId'})
    }
  }
  ProductImage.init({
    value: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    attributeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductImage',
  });
  return ProductImage;
};