const { Promotion } = require('../models');
const promotionService = require('../services/promotion.service');

module.exports = {
  create: async (req, res) => {
    try {
      const { data, code } = await promotionService.create(req.body);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  getPromotionByPK: async (req, res) => {
    try {
      await promotionService.validateExpiredPromotion();
      const { data, code } = await promotionService.getPromotionByPK(
        req.params
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  getPromotionByShop: async (req, res) => {
    try {
      await promotionService.validateExpiredPromotion();
      const { data, code } = await promotionService.getPromotionByShop(
        req.params,
        req.query
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  // getPromotionByProduct: async (req, res) => {
  //   try {
  //     await promotionService.validateExpiredPromotion();
  //     const { data, code } = await promotionService.getPromotionByProduct(
  //       req.params
  //     );
  //     return res.status(code).json(data);
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500);
  //   }
  // },
  addPromotionForProduct: async (req, res) => {
    try {
      const { data, code } = await promotionService.addPromotionForProduct(
        req.body
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  delete: async (req, res) => {
    try {
      const { data, code } = await promotionService.delete(req.params);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  update: async (req, res) => {
    try {
      const { data, code } = await promotionService.update(
        req.params,
        req.body
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
