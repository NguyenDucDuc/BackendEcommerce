'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttributeGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Attribute, Product, AttributeSet}) {
      // define association here
      this.hasMany(Product, {foreignKey: 'attributeGroupId'})
      this.hasMany(AttributeSet,{foreignKey:'attributeGroupId'})
    }
  }
  AttributeGroup.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AttributeGroup',
  });
  return AttributeGroup;
};