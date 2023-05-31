const reviewService = require('../services/review.service');
const {Review} = require('../models')

module.exports = {
  getReviewByProductId: async (req, res) => {
    const productId = req.params.id;
    try {
      const { code, data } = await reviewService.getReviewByProductId(
        productId,
        req.query.page
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },

  addReview: async (req, res) => {
    const review = req.body;
    review.userId = 1;
    review.createdAt = new Date();
    review.updatedAt = new Date();
    try {
      const { code, data } = await reviewService.addReview(review);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
  countRateOfProduct: async (req, res) => {
    let productId = req.params.id;
    try {
      const { code, data } = await reviewService.countRateOfProduct(productId);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
  getProductPurchased: async (req, res) => {
    try {
      const { code, data } = await reviewService.getProductPurchased(
        req.customerId
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },

  addReviewV2: async (req, res) => {
    try {
      const body = req.body
      const userId = req.data.userId
      const {code, data} = await reviewService.addReviewV2(body, userId)
      return res.status(code).json(data)
    } catch (error) {
      console.log(error)
    }
  },

  getAllReviewV2: async (req, res) => {
    try {
      const productId = +req.params.productId
      const reviews = await Review.findAll({

      })
    } catch (error) {
      console.log(error)
    }
  },

  statsReviewV2: async (req, res) => {
    try {
      const rates = await Review.findAll({where: {productId: +req.params.productId}})
      let oneStar = (await Review.findAll({where: {productId: +req.params.productId, rate: 1}})).length
      let twoStar = (await Review.findAll({where: {productId: +req.params.productId, rate: 2}})).length
      let threeStar = (await Review.findAll({where: {productId: +req.params.productId, rate: 3}})).length
      let fourStar = (await Review.findAll({where: {productId: +req.params.productId, rate: 4}})).length
      let fiveStar = (await Review.findAll({where: {productId: +req.params.productId, rate: 5}})).length
      let avgRate = rates.reduce((sum, rateItem) => sum + rateItem.rate, 0)
      avgRate = Math.ceil(avgRate / rates.length)
      return res.status(200).json({
        status: 200,
        data: {
          avgRate,
          oneStar,
          twoStar,
          threeStar,
          fourStar,
          fiveStar
        }
      })
    } catch (error) {
      console.log(error)
    }
  },

  checkReviewed: async (req, res) => {
    try {
      const rate = await Review.findOne({where: {
        userId: +req.data.userId,
        productId: +req.params.productId
      }})
      return res.status(200).json({
        status: 200,
        data: rate
      })
    } catch (error) {
      console.log(error)
    }
  }
};
