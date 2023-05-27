const promotionController = require('../controllers/promotion.controller');
const auth = require('../middlewares/auth.middleware');

const promotionRouter = require('express').Router();

promotionRouter.post('/', auth.verifyShop, promotionController.create);
promotionRouter.get('/:id', promotionController.getPromotionByPK);
promotionRouter.get(
  '/get-promotion-by-shop/:shopId',
  promotionController.getPromotionByShop
);
promotionRouter.post(
  '/add-promotion-for-product',
  promotionController.addPromotionForProduct
);
// promotionRouter.get(
//   '/get-promotion-by-product/:productId',
//   promotionController.getPromotionByProduct
// );

promotionRouter.put('/:id', promotionController.update);
promotionRouter.delete('/:id', promotionController.delete);

module.exports = { promotionRouter };
