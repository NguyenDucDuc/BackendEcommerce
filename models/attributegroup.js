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
      this.belongsTo(Attribute,{foreignKey:'attributeId'})
      this.hasMany(Product, {foreignKey: 'attributeGroupId'})
      this.hasMany(AttributeSet,{foreignKey:'attributeGroupId'})
    }
  }
  AttributeGroup.init({
    name: DataTypes.STRING,
    attributeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AttributeGroup',
  });
  return AttributeGroup;
};