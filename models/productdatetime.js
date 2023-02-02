'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDateTime extends Model {
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
  ProductDateTime.init({
    value: DataTypes.DATE,
    productId: DataTypes.INTEGER,
    attributeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductDateTime',
  });
  return ProductDateTime;
};