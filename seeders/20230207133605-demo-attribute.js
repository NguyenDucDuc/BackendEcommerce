"use strict";
const { attributes } = require("../data/attributes.data");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Attributes", attributes);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Attributes", null, {});
  },
};
