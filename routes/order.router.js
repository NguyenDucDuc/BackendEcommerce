const orderController = require('../controllers/order.controller');
const router = require('express').Router();

router.post('/', orderController.buyProduct);
router.get('/', orderController.getDetails);
router.post('/action', orderController.confirmOrder);

module.exports = router;
