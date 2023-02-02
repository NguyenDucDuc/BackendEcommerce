'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sku: {
        type: Sequelize.STRING
      },
      rate: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      desc: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      unitInStock: {
        type: Sequelize.INTEGER
      },
      unitOnOrder: {
        type: Sequelize.INTEGER
      },
      shopId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Shops',
          key:'id'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
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
    await queryInterface.dropTable('Products');
  }
};