"use strict";
const orderDetails = require("../data/orderDetails.data");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("OrderDetails", orderDetails);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("OrderDetails", null, {});
  },
};
