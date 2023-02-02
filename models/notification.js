'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User,{foreignKey:'userId'})
    }
  }
  Notification.init({
    content: DataTypes.STRING,
    type: DataTypes.STRING,
    valueId: DataTypes.STRING,
    creatorId: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};