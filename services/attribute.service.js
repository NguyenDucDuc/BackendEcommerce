const { Op } = require("sequelize");
const db = require("../models");
const resUtil = require("../utils/res.util");

module.exports = {
  getAtrributeByGroupID: async ({ groupId }) => {
    try {
      const attributeSets = await db.AttributeSet.findAll({
        where: { attributeGroupId: groupId },
      });

      const attributesID = attributeSets.reduce((acc, item) => {
        return [...acc, item.dataValues.attributeId];
      }, []);

      const attributes = await db.Attribute.findAll({
        where: {
          id: {
            [Op.in]: attributesID,
          },
        },
      });
      return resUtil.successful(200, attributes);
    } catch (error) {
      console.log(error);
      resUtil.serverError();
    }
  },
};
