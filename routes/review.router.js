const router = require('express').Router();
const reviewController = require('../controllers/review.controller');
const auth = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware')

router.post('/', auth.verifyAddReview, reviewController.addReview);
router.get(
  '/products',
  auth.verifyCustomer,
  reviewController.getProductPurchased
);
router.post('/create-v2', userMiddleware.verifyToken, reviewController.addReviewV2)

module.exports = router;
