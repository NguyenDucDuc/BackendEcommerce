const productController = require('../controllers/product.controller');
const router = require('express').Router();

router.get('', productController.getAllProduct);

module.exports = router;
