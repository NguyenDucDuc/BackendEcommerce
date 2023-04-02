const adminService = require('../services/admin.service');
const responseUtil = require('../utils/response.util');

module.exports = {
  stats: async (req, res) => {
    let params = req.body;
    try {
      const { code, data } = await adminService.stats(params);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  loginAdmin: async (req, res) => {
    try {
      const body = req.body
      const {code, data} = await adminService.loginAdmin(body)
      return res.status(code).json(data)
    } catch (error) {
      console.log(error)
      const {code, data} = responseUtil.serverError()
      return res.status(code).json(data)
    }
  }
};
