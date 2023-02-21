'use strict';
const data = require('../data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Attributes', data.attributes);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Attributes', null, {});
  },
};

