'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttributeSet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({AttributeGroup, Attribute}) {
      // define association here
      this.belongsTo(AttributeGroup,{foreignKey:'attributeGroupId'})
      this.belongsTo(Attribute,{foreignKey:'attributeId'})
    }
  }
  AttributeSet.init({
    attributeGroupId: DataTypes.INTEGER,
    attributeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AttributeSet',
  });
  return AttributeSet;
};