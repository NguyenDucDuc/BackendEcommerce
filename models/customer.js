'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Order, Report}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      this.hasMany(Order, {foreignKey: 'customerId'})
      this.hasMany(Report, {foreignKey: 'customerId'})
    }
  }
  Customer.init({
    point: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};