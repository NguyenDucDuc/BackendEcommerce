const { Op } = require('sequelize');
const { Promotion } = require('../models');
const db = require('../models');
const resUtil = require('../utils/res.util');
const randomString = require('randomstring');

const promotionService = {
  create: async ({ desc, value, dateEnd, shopId }) => {
    try {
      const code = randomString.generate(10);
      const newPromotion = await Promotion.create({
        code,
        desc: desc,
        value: value,
        isActive: true,
        dateEnd: dateEnd,
        shopId: shopId,
        createAt: new Date(),
        updateAt: new Date(),
      });
      return resUtil.successful(201, newPromotion);
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },
  getPromotionByShop: async ({ shopId }, { pageNumber }) => {
    console.log({ pageNumber });
    if (!pageNumber) pageNumber = 1;
    try {
      let promotion;
      if (pageNumber === '-1') {
        promotion = await Promotion.findAll({
          where: {
            shopId: shopId,
            isActive: true,
          },
        });
      } else {
        promotion = await Promotion.findAll({
          where: {
            shopId: shopId,
          },
          order: [['dateEnd', 'DESC']],
          offset: (pageNumber - 1) * 5,
          limit: 5,
        });
      }
      const promotionCounter = await Promotion.count({
        where: {
          shopId: shopId,
        },
      });
      const data = {
        listPromotion: promotion,
        totalRecords: promotionCounter,
      };
      return resUtil.successful(200, data);
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },
  getPromotionByPK: async ({ id }) => {
    try {
      const promotion = await Promotion.findByPk(id);
      return resUtil.successful(200, promotion);
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },
  // getPromotionByProduct: async ({ productId }) => {
  //   try {
  //     const promotion = await ProductPromotions.findAll({
  //       where: {
  //         productId: productId,
  //       },
  //       include: {
  //         model: Promotion,
  //         where: {
  //           isActive: true,
  //         },
  //       },
  //     });
  //     return resUtil.successful(200, promotion);
  //   } catch (error) {
  //     console.log(error);
  //     return resUtil.serverError();
  //   }
  // },
  addPromotionForProduct: async ({ productId, promotionId }) => {
    try {
      const product = await db.Product.findByPk(productId);
      const promotion = await Promotion.findByPk(promotionId);
      if (!promotion) {
        return resUtil.successful(400, [], 'Không có khuyến mãi phù hợp');
      }
      product.promotionId = parseInt(promotionId);
      let priceDiscount = await db.ProductDecimal.findOne({
        where: {
          productId: productId,
        },
      });

      await db.ProductCart.update(
        { unitPrice: product.price - product.price * promotion.value },
        {
          where: {
            productId: product.id,
          },
        }
      );

      if (priceDiscount) {
        priceDiscount.promotionId = promotionId;
        priceDiscount.value =
          product.price - parseInt(product.price * promotion.value);
        await priceDiscount.save();
      } else {
        await db.ProductDecimal.create({
          productId: productId,
          attributeId: 27,
          value: product.price - parseInt(product.price * promotion.value),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      product.save();
      return resUtil.successful(201, product, 'Thêm khuyến mãi thành công');
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },

  delete: async ({ id }) => {
    try {
      const promotion = await Promotion.findByPk(id);
      promotion.isActive = false;
      await promotion.save();
      return resUtil.successful(200, [], 'Xóa thành công');
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },

  update: async ({ id }, promotionUpdate) => {
    try {
      const promotion = await Promotion.findByPk(id);
      await promotion.update(promotionUpdate);
      await promotion.save();
      return resUtil.successful(200, promotion, 'Cập nhật thành công.');
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },

  validateExpiredPromotion: async () => {
    try {
      const promotions = await Promotion.findAll({
        where: {
          [Op.or]: [
            {
              dateEnd: {
                [Op.lt]: new Date(),
              },
            },
            {
              isActive: false,
            },
          ],
        },
      });

      const listPromotionId = promotions.map((promotion) => promotion.id);
      const products = await db.Product.findAll({
        where: {
          promotionId: listPromotionId,
        },
      });
      const listProductId = products.map((product) => product.id);

      await db.Product.update(
        { promotionId: null },
        {
          where: {
            id: listProductId,
          },
        }
      );
      await Promotion.update(
        { isActive: false },
        {
          where: {
            id: {
              [Op.in]: listPromotionId,
            },
          },
        }
      );
      products.forEach(async (product) => {
        await db.ProductCart.update(
          { unitPrice: product.price },
          {
            where: {
              productId: product.id,
            },
          }
        );
      });
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },
};

module.exports = promotionService;
