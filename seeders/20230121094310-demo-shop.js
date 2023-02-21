'use strict';
const data = require('../data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Shops', data.shop);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Shops', null, {});
  },
};
