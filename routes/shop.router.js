const shopController = require('../controllers/shop.controller');
const shopMiddleware = require('../middlewares/shop.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const auth = require('../middlewares/auth.middleware');
const { check } = require('express-validator');

const shopRouter = require('express').Router();

shopRouter.get('/get-all', shopController.getAll);
shopRouter.get('/:id', shopController.getById);

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

shopRouter.post(
  '/:shopId/stats',
  auth.verifyStatsShop,
  shopController.revenueStats
);
shopRouter.put('/:shopId', shopController.updateShop);

shopRouter.get('/:shopId/get-user', shopController.getUserByShopId);
shopRouter.get('/:userId/get-shop/', shopController.getShopByUserId);

module.exports = { shopRouter };
