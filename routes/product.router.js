const productController = require('../controllers/product.controller');
const reviewController = require('../controllers/review.controller');

const router = require('express').Router();

router.get('/:id', productController.getProductByID);
router.get('', productController.getProductByKw);
router.post('', productController.addProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);
router.post('/compare', productController.compareProduct);
router.get('/:id/rate-product', reviewController.countRateOfProduct);
router.get('/:id/reviews', reviewController.getReviewByProductId);


module.exports = router;
