'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Address,
      Admin,
      Cart,
      Customer,
      Notification,
      Payment,
      Staff,
      Review,
    }) {
      // define association here
      this.hasMany(Address, { foreignKey: 'userId', onDelete: 'CASCADE' });
      this.hasMany(Admin, { foreignKey: 'userId', onDelete: 'CASCADE' });
      this.hasMany(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
      this.hasMany(Customer, { foreignKey: 'userId', onDelete: 'CASCADE' });
      this.hasMany(Notification, { foreignKey: 'userId', onDelete: 'CASCADE' });
      this.hasMany(Payment, { foreignKey: 'userId', onDelete: 'CASCADE' });
      this.hasMany(Staff, { foreignKey: 'userId', onDelete: 'CASCADE' });
      this.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      passWord: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      avatar: DataTypes.STRING,
      email: DataTypes.STRING,
      birthDay: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      lastVisited: DataTypes.DATE,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
