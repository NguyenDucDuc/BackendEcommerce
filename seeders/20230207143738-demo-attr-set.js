'use strict';
const data = require('../data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('AttributeSets', data.attributeSets);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('AttributeSets', null, {});
  },
};

