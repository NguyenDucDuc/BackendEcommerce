'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, Order}) {
      // define association here
      this.belongsTo(Product, {foreignKey: 'productId'})
      this.belongsTo(Order, {foreignKey: 'orderId'})
    }
  }
  OrderDetail.init({
    productName: DataTypes.STRING,
    shopName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    unitPrice: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};