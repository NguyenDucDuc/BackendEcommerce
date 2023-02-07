'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({AttributeGroup, AttributeSet, ProductDateTime, ProductDecimal,ProductImage, ProductInt, ProductVarchar}) {
      // define association here
      this.hasMany(AttributeSet, {foreignKey: "attributeId"})
      this.hasMany(ProductDateTime, {foreignKey: 'attributeId'})
      this.hasMany(ProductDecimal, {foreignKey: 'attributeId'})
      this.hasMany(ProductImage, {foreignKey: 'attributeId'})
      this.hasMany(ProductInt, {foreignKey: 'attributeId'})
      this.hasMany(ProductVarchar, {foreignKey: 'attributeId'})
    }
  }
  Attribute.init({
    name: DataTypes.STRING,
    backendType: DataTypes.STRING,
    frontendInput: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attribute',
  });
  return Attribute;
};