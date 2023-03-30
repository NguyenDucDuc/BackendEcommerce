const { Op } = require("sequelize");
const db = require("../models");
const resUtil = require("../utils/res.util");

module.exports = {
  getAllAtrributeGroup: async () => {
    try {
      const attributeSets = await db.AttributeGroup.findAll();
      return resUtil.successful(200, attributeSets);
    } catch (error) {
      console.log(error);
      resUtil.serverError();
    }
  },
};
