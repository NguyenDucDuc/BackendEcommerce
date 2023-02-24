const shopController = require('../controllers/shop.controller');
const shopMiddleware = require('../middlewares/shop.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const { check } = require('express-validator');

const shopRouter = require('express').Router();

shopRouter.post(
  '/',
  [
    check('shopName').notEmpty().withMessage('shop name is required'),
    check('desc').notEmpty().withMessage('description is required'),
    check('image').notEmpty().withMessage('image is required'),
  ],
  userMiddleware.verifyToken,
  shopMiddleware.verifyCreate,
  shopController.create
);
//
shopRouter.patch(
  '/block/:id',
  userMiddleware.verifyToken,
  userMiddleware.verifyAdmin,
  shopController.block
);
//
shopRouter.patch(
  '/unlock/:id',
  userMiddleware.verifyToken,
  userMiddleware.verifyAdmin,
  shopController.unLock
);
//
shopRouter.get(
  '/',
  userMiddleware.verifyToken,
  userMiddleware.verifyAdmin,
  shopController.getAll
);
//
shopRouter.delete(
  '/:shopId',
  userMiddleware.verifyToken,
  shopMiddleware.verifyDelete,
  shopController.delete
);

shopRouter.get('/:shopId/order', shopController.getOrder);
shopRouter.post('/:shopId/stats', shopController.revenueStats);

module.exports = { shopRouter };
