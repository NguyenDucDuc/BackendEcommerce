'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Customer, OrderDetail}) {
      // define association here
      this.belongsTo(Customer, {foreignKey: 'customerId'})
      this.hasMany(OrderDetail, {foreignKey: 'orderId'})
    }
  }
  Order.init({
    status: DataTypes.STRING,
    shipAddress: DataTypes.STRING,
    attribute: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};