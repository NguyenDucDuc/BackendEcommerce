'use strict';
const {attributeSets} = require('../data/attribute_set.data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('AttributeSets', attributeSets);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('AttributeSets', null, {});
  },
};

