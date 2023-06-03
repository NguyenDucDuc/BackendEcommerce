'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rate: {
        type: Sequelize.FLOAT,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      desc: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      unitInStock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unitOnOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      shopId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Shops',
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      attributeGroupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'AttributeGroups',
          key: 'id',
        },
      },
      promotionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Promotions',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  },
};
