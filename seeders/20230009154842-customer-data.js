'use strict';

const customerData = require('../data/customer.data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Customers', customerData)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Customers', null, {});
  },
};
