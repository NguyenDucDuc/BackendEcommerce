'use strict';

const shopData = require('../data/shop.data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Shops', shopData)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Shops', null, {});
  },
};
