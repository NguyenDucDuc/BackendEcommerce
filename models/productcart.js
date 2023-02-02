'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, Cart}) {
      // define association here
      this.belongsTo(Product, {foreignKey: 'productId'})
      this.belongsTo(Cart, {foreignKey: 'cartId'})
    }
  }
  ProductCart.init({
    quantity: DataTypes.INTEGER,
    unitPrice: DataTypes.FLOAT,
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductCart',
  });
  return ProductCart;
};