const router = require('express').Router();
const reviewController = require('../controllers/review.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth.verifyAddReview, reviewController.addReview);
router.get(
  '/products',
  auth.verifyCustomer,
  reviewController.getProductPurchased
);

module.exports = router;
