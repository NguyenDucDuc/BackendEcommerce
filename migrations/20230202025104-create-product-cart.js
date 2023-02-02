'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductCarts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      unitPrice: {
        type: Sequelize.FLOAT
      },
      cartId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Carts',
          key:'id'
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductCarts');
  }
};