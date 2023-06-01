'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, ProductCart}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      this.hasMany(ProductCart, {foreignKey: 'cartId', onDelete: 'CASCADE'})
    }
  }
  Cart.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};