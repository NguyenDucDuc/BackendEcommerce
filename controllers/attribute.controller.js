const attributeService = require("../services/attribute.service");
const resUtil = require("../utils/res.util");

module.exports = {
  getAtrributeByGroupID: async (req, res) => {
    try {
      const { code, data } = await attributeService.getAtrributeByGroupID(
        req.params
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      resUtil.serverError();
    }
  },
};
