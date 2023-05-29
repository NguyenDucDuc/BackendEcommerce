const shopServices = require('../services/shop.service');
const resUtil = require('../utils/res.util');
const { Seller, Shop, sequelize } = require('../models');

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
      console.log(12312);
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
  getById: async (req, res) => {
    try {
      const { code, data } = await shopServices.getById(req.params.id);
      res.status(code).json(data);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
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

  getUserByShopId: async (req, res) => {
    const shopId = req.params.shopId;
    try {
      const { code, data } = await shopServices.getUserByShopId(shopId);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  getShopByUserId: async (req, res) => {
    try {
      const { code, data } = await shopServices.getShopByUserId(req.params);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  updateShop: async (req, res) => {
    const shopId = req.params.shopId;
    const amount = Number(req.body.amount);
    try {
      const { code, data } = await shopServices.updateShop({ shopId, amount });
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  statsAdmin: async (req, res) => {
    try {
      console.log('asda');
      const countStore = await sequelize.query(
        `select count(*) as 'count' from shops`
      );
      return res.status(200).json({ countStore });
    } catch (error) {
      console.log(error);
    }
  },
};
