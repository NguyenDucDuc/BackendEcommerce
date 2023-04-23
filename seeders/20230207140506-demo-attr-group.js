'use strict';
const { attributeGroups } = require("../data/attributes_group.data");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('AttributeGroups', attributeGroups);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('AttributeGroups', null, {});
  },
};

