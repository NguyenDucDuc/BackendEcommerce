const reviewService = require('../services/review.service');

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
};
