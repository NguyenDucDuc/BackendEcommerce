'use strict';
const {productVarchar} = require('../data/product.data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ProductVarchars', productVarchar);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ProductVarchars', null, {});
  },
};

