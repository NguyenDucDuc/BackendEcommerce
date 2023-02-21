const productController = require('../controllers/product.controller');
const router = require('express').Router();

router.get('/:id', productController.getProductByID);
router.get('', productController.getProductByKw);
router.post('', productController.addProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);
router.post('/compare', productController.compareProduct);

module.exports = router;
