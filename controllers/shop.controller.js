const shopServices = require('../services/shop.service');
const responseUtil = require('../utils/response.util');
const { Seller } = require('../models');

module.exports = {
  create: async (req, res) => {
    try {
      const body = req.body;
      const files = req.files;
      const seller = await Seller.findOne({
        where: { userId: req.data.userId },
      });
      const { code, data } = await shopServices.create(body, seller.id, files);
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  block: async (req, res) => {
    try {
      const shopId = req.params.id;
      const { code, data } = await shopServices.block(shopId);
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  unLock: async (req, res) => {
    try {
      const shopId = req.params.id;
      const { code, data } = await shopServices.unLock(shopId);
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  getAll: async (req, res) => {
    try {
      const { code, data } = await shopServices.getAll();
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  delete: async (req, res) => {
    try {
      const shopId = parseInt(req.params.shopId);
      const { code, data } = await shopServices.delete(shopId);
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  getOrder: async (req, res) => {
    try {
      const { code, data } = await shopServices.getOrder({
        state: req.query.state,
        shopId: req.params.shopId,
      });
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  revenueStats: async (req, res) => {
    let params = req.body;
    params.shopId = req.params.shopId;
    try {
      const { code, data } = await shopServices.revenueStats(params);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
