'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, User }) {
      this.belongsTo(Product, { foreignKey: 'productId' });
      this.belongsTo(User, { foreignKey: 'userId' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  Review.init(
    {
      content: DataTypes.STRING,
      rate: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );
  return Review;
};
