const adminService = require('../services/admin.service');

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
};
