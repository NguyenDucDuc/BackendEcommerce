'use strict';
const {productImages} = require('../data/product.data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ProductImages', productImages);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ProductImages', null, {});
  },
};

