"use strict";
const orders = require("../data/order.data");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Orders", orders);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Orders", null, {});
  },
};
