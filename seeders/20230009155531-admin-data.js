'use strict';

const adminData = require('../data/admin.data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Admins', adminData)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Admins', null, {});
  },
};
