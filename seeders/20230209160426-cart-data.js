'use strict';

const cartData = require('../data/cart.data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Carts', cartData)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Carts', null, {});
  },
};
