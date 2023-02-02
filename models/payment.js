'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId'})
    }
  }
  Payment.init({
    bank: DataTypes.STRING,
    account: DataTypes.STRING,
    type: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};