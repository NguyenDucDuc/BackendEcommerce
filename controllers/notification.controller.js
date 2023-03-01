const { Nofitication } = require('../models');
const notificationService = require('../services/notification.service');
const responseUtil = require('../utils/response.util');

module.exports = {
  create: async (req, res) => {
    try {
      const body = req.body;
      const { code, data } = await notificationService.create(body);
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  getByUserId: async (req, res) => {
    try {
      const { code, data } = await notificationService.getByUserId(
        req.data.userId
      );
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
};
