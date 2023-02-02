'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AttributeSets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      attributeGroupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'AttributeGroups',
          key:'id'
        }
      },
      attributeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Attributes',
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
    await queryInterface.dropTable('AttributeSets');
  }
};