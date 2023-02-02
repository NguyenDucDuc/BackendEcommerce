'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, Promotion}) {
      // define association here
      this.hasMany(Product, {foreignKey: 'shopId'})
      this.hasMany(Promotion, {foreignKey: 'shopId'})
    }
  }
  Shop.init({
    shopName: DataTypes.STRING,
    rate: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    sellerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shop',
  });
  return Shop;
};