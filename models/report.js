'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Shop, Customer}) {
      // define association here
      this.belongsTo(Shop, {foreignKey: 'shopId'})
      this.belongsTo(Customer, {foreignKey: 'customerId'})
    }
  }
  Report.init({
    customerId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};