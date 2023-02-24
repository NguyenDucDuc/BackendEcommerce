'use strict';

const sellerData = require('../data/seller.data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sellers', sellerData)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Sellers', null, {});
  },
};
