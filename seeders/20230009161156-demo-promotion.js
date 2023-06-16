'use strict';
const promotion = require('../data/promotion.data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Promotions', promotion);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Promotions', null, {});
  },
};
