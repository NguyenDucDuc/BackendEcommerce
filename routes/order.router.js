const orderController = require('../controllers/order.controller');
const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');

router.post('/', auth.verifyCustomer, orderController.buyProduct);
router.get('/', auth.verifyGetOrderOfShopAndCustomer, orderController.getOrder);
router.get(
  '/details',
  auth.verifyGetOrderOfShopAndCustomer,
  orderController.getDetails
);
router.post('/action', auth.verifyConfirmProduct, orderController.confirmOrder);

module.exports = router;
