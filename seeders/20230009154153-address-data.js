'use strict';

const addressData = require('../data/address.data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Addresses', addressData);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Addresses', null, {});
  },
};
