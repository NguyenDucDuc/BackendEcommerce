const db = require('../models');
const _Review = db.Review;
const _Product = db.Product;
const _Shop = db.Shop;
const _Customer = db.Customer;
const { QueryTypes, Utils } = require('sequelize');
const resUtil = require('../utils/res.util');
const {Review, User} = require('../models')

const reviewService = {
  getReviewByProductId: async (productId, page = 1) => {
    let start = parseInt((page - 1) * process.env.PAGE_SIZE_REVIEW);
    try {
      const reviews = await _Review.findAll({
        include: {
          model: db.User,
          attributes: ['id', 'firstName', 'lastName', 'avatar'],
        },
        where: {
          productId: productId,
        },
        offset: start,
        limit: parseInt(process.env.PAGE_SIZE_REVIEW),
        order: [['id', 'DESC']],
      });
      if (reviews) {
        const amountReview = await db.Review.count({
          where: {
            productId: productId,
          },
        });
        return resUtil.successful(200, {
          listReview: reviews,
          amountPage: Math.ceil(amountReview / process.env.PAGE_SIZE_REVIEW),
          amountReview: amountReview,
        });
      } else {
        return resUtil.successful(200, 'Sản phẩm chưa được đánh giá');
      }
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },
  countRateOfProduct: async (productId) => {
    try {
      const rate = await db.sequelize.query(
        `select rate, count(*) as rateCount  from ecommerce.reviews 
        where productId = :productId 
        group by rate 
        order by rate desc`,
        {
          replacements: { productId: productId },
          type: QueryTypes.SELECT,
        }
      );
      let counterRate = Object.values(rate).reduce(
        (obj, item) => {
          obj['point'] += item['rate'];
          obj['counter'] += item['rateCount'];
          return obj;
        },
        {
          point: 0,
          counter: 0,
        }
      );
      return resUtil.successful(200, {
        rate: rate,
        avgRage: parseFloat((counterRate.point / counterRate.counter).toFixed(1)),
      });
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },
  addReview: async (review) => {
    const transaction = await db.sequelize.transaction();

    try {
      const newReview = await _Review.create(review, {
        transaction: transaction,
      });
      if (newReview) {
        const product = await newReview.getProduct();
        const shopId = product.shopId;
        const { totalRate: totalRateReview, amount: amountReview } =
          await reviewService.calAVGRateOnProduct(newReview.productId);

        product.rate = reviewService.calAVG(
          totalRateReview
            ? parseInt(totalRateReview) + newReview.rate
            : newReview.rate,
          parseInt(amountReview) + 1
        );

        const { totalRate: totalRateProduct, amount: amountProduct } =
          await reviewService.calAVGRateOnShop(shopId, product.id);
        await _Shop.update(
          {
            rate: reviewService.calAVG(
              totalRateProduct
                ? parseInt(totalRateProduct) + product.rate
                : product.rate,
              amountProduct ? parseInt(amountProduct) + 1 : 1
            ),
          },
          {
            where: {
              id: shopId,
            },
            transaction: transaction,
          }
        );
        await transaction.commit();
        await product.save();
        return resUtil.successful(201, newReview);
      }
      return resUtil.serverError();
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      return resUtil.serverError();
    }
  },

  getProductPurchased: async (cutomerId) => {
    try {
      if (!cutomerId) {
        return resUtil.clientError(404, [], 'Khách hàng không tồn tại');
      }
      const listOrder = await db.Order.findAll({
        where: {
          customerId: cutomerId,
          state: 4,
        },
      });
      if (listOrder.length === 0) {
        return resUtil.clientError(404, [], 'Chưa có đơn hàng');
      }
      let orderIds = listOrder.map((order) => order.id);
      const listOrderDetails = await db.OrderDetail.findAll({
        where: {
          orderId: orderIds,
        },
      });
      let productIds = listOrderDetails.reduce((list, detail) => {
        if (!list.includes(detail.productId)) {
          list.push(detail.productId);
        }
        return list;
      }, []);
      const listProduct = await db.Product.findAll({
        where: {
          id: productIds,
        },
      });
      return resUtil.successful(200, listProduct);
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },

  calAVGRateOnProduct: async (productId) => {
    try {
      const result = await db.sequelize.query(
        `select sum(rate) as totalRate, count(id) as amount from ecommerce.reviews where productId = :productId`,
        {
          replacements: { productId: productId },
          plain: true,
        }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  calAVGRateOnShop: async (shopId, productId) => {
    try {
      const result = await db.sequelize.query(
        `select sum(rate) as totalRate, count(id) as amount from ecommerce.products where shopId = :shopId and not id = :id`,
        {
          replacements: { shopId: shopId, id: productId },
          plain: true,
        }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  calAVG: (totalPoint, amnount) => (totalPoint / amnount).toFixed(1),
  addReviewV2: async (body, userId) => {
    try {
      const user = await User.findByPk(userId)
      const newReview = await Review.create({
        content: body.content,
        rate: body.rate,
        productId: body.productId,
        userId
      })
      return {
        code: 200,
        data: {
          status: 200,
          data: {
            ...newReview.dataValues,
            User: user
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
};

module.exports = reviewService;
