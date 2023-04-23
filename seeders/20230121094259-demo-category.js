'use strict';
const {categories} = require('../data/categories.data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', categories);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  },
};
