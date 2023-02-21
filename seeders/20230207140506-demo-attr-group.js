'use strict';
const data = require('../data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('AttributeGroups', data.attributeGroups);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('AttributeGroups', null, {});
  },
};

