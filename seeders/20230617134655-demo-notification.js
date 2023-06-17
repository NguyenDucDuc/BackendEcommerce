"use strict";
const notifications = require("../data/notification.data");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Notifications", notifications);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Notifications", null, {});
  },
};
