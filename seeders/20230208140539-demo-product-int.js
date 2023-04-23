'use strict';
const {productInt} = require('../data/product.data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ProductInts', productInt);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ProductInts', null, {});
  },
};

