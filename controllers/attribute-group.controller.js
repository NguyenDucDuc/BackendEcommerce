const attributeGroupService = require("../services/attribute-group.service");
const resUtil = require("../utils/res.util");

module.exports = {
  getAllAtrributeGroup: async (req, res) => {
    try {
      const { code, data } = await attributeGroupService.getAllAtrributeGroup();
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      resUtil.serverError();
    }
  },
};
