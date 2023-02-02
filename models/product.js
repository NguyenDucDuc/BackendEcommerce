'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({AttributeGroup, OrderDetail, Shop, Category, ProductCart, ProductDateTime, ProductDecimal, ProductImage, ProductInt, ProductVarchar, Promotion}) {
      // define association here
      this.hasMany(AttributeGroup, {foreignKey: "productId"})
      this.hasMany(OrderDetail, {foreignKey: 'productId'})
      this.belongsTo(Shop, {foreignKey: 'shopId'})
      this.belongsTo(Category, {foreignKey: 'categoryId'})
      this.hasMany(ProductCart, {foreignKey: 'productId'})
      this.hasMany(ProductDateTime, {foreignKey: 'productId'})
      this.hasMany(ProductDecimal, {foreignKey: 'productId'})
      this.hasMany(ProductImage, {foreignKey: 'productId'})
      this.hasMany(ProductInt, {foreignKey: 'productId'})
      this.hasMany(ProductVarchar, {foreignKey: 'productId'})
      this.hasMany(Promotion, {foreignKey: 'productId'})
    }
  }
  Product.init({
    name: DataTypes.STRING,
    sku: DataTypes.STRING,
    rate: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    isActive: DataTypes.BOOLEAN,
    desc: DataTypes.STRING,
    image: DataTypes.STRING,
    unitInStock: DataTypes.INTEGER,
    unitOnOrder: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};