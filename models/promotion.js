'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Shop, Product}) {
      // define association here
      this.belongsTo(Shop, {foreignKey: 'shopId'})
      this.belongsTo(Product, {foreignKey: 'productId'})
    }
  }
  Promotion.init({
    code: DataTypes.STRING,
    desc: DataTypes.TEXT('long'),
    value: DataTypes.FLOAT,
    isActive: DataTypes.BOOLEAN,
    shopId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    dateEnd: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Promotion',
  });
  return Promotion;
};