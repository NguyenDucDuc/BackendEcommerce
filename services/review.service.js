const db = require('../models');
const _Review = db.Review;
const _Product = db.Product;
const _Shop = db.Shop;
const _Customer = db.Customer;
const { QueryTypes } = require('sequelize');

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
        const pageAmount = await db.Review.count({
          where: {
            productId: productId,
          },
        });
        return {
          code: 200,
          data: {
            status: 200,
            data: {
              listReview: reviews,
              pageAmount: pageAmount,
            },
          },
        };
      } else {
        return {
          code: 200,
          data: {
            status: 200,
            message: 'Sản phẩm chưa được đánh giá',
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        data: {
          status: 500,
          message: 'Đã có lỗi xảy ra',
        },
      };
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
      return {
        code: 200,
        data: {
          status: 200,
          data: {
            rate: rate,
            avgRage: counterRate.point / counterRate.counter,
          },
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
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
        const { rateProduct } = await reviewService.calAVGRateOnProduct(
          newReview.productId
        );

        await _Product.update(
          { rate: rateProduct },
          {
            where: {
              id: newReview.productId,
            },
            transaction: transaction,
          }
        );

        const { rateShop } = await reviewService.calAVGRateOnShop(shopId);
        await _Shop.update(
          { rate: rateShop },
          {
            where: {
              id: shopId,
            },
            transaction: transaction,
          }
        );

        transaction.commit();
        return {
          code: 201,
          data: {
            status: 201,
            data: newReview,
          },
        };
      }
      return {
        code: 400,
      };
    } catch (error) {
      transaction.rollback();
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  calAVGRateOnProduct: async (productId) => {
    try {
      const rate = await db.sequelize.query(
        `select avg(rate) as rateProduct from ecommerce.reviews where productId = :productId`,
        {
          replacements: { productId: productId },
          plain: true,
        }
      );
      return rate;
    } catch (error) {
      console.log(error);
    }
  },

  calAVGRateOnShop: async (shopId) => {
    try {
      const rate = await db.sequelize.query(
        `select avg(rate) as rateShop from ecommerce.products where shopId = :shopId`,
        {
          replacements: { shopId: shopId },
          plain: true,
        }
      );
      return rate;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = reviewService;
