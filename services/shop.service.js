const { client } = require("../databases/redis.init");
const { Shop, Seller, Order } = require("../models");
const { QueryTypes } = require("sequelize");
const db = require("../models");
const { Op } = require("sequelize");
const responseUltil = require("../utils/response.util");
const resUtil = require("../utils/res.util");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const shopService = {
  create: async (body, sellerId, files) => {
    try {
      const shop = await Shop.findOne({ where: { sellerId: sellerId } });
      if (shop) {
        return {
          code: 400,
          data: {
            status: 400,
            data: [],
            errors: "You can only create one store",
          },
        };
      }
      const oldShop = await Shop.findOne({
        where: { shopName: body.shopName },
      });
      if (!oldShop) {
        const image = files.image;
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
          public_id: `${Date.now()}`,
          resource_type: "auto",
          folder: "Shop",
        });
        const newShop = await Shop.create({
          shopName: body.shopName,
          rate: 0,
          desc: body.desc,
          isBlock: true,
          image: result.url,
          sellerId: sellerId,
        });
        // add new shop to redis
        await client.json.arrAppend("shops", "$", newShop);
        return responseUltil.created(newShop);
      } else {
        return {
          code: 400,
          data: {
            status: 400,
            data: [],
            errors: "Shop is already exists",
          },
        };
      }
    } catch (error) {
      console.log(error);
      return responseUltil.serverError();
    }
  },
  block: async (shopId) => {
    try {
      const shop = await Shop.findOne({ where: { id: shopId } });
      if (shop) {
        shop.isBlock = true;
        await shop.save();
      }
      return responseUltil.getSuccess(shop);
    } catch (error) {
      console.log(error);
      return responseUltil.serverError();
    }
  },
  unLock: async (shopId) => {
    try {
      const shop = await Shop.findOne({ where: { id: shopId } });
      if (shop) {
        shop.isBlock = false;
        await shop.save();
      }
      return responseUltil.getSuccess(shop);
    } catch (error) {
      console.log(error);
      return responseUltil.serverError();
    }
  },
  getAll: async () => {
    try {
      const shops = await Shop.findAll();
      return responseUltil.getSuccess(shops);
    } catch (error) {
      console.log(error);
      return responseUltil.serverError();
    }
  },
  delete: async (shopId) => {
    try {
      console.log(shopId);
      const shop = await Shop.findByPk(shopId);
      await shop.destroy();
      return {
        code: 200,
        data: {
          status: 200,
          data: shop,
        },
      };
    } catch (error) {
      console.log(error);
      return responseUltil.serverError();
    }
  },
  getById: async (shopId) => {
    try {
      const shop = await Shop.findByPk(shopId);
      return responseUltil.getSuccess(shop);
    } catch (error) {
      console.log(error);
      return responseUltil.serverError();
    }
  },
  revenueStats: async ({
    shopId,
    type,
    categoryId,
    name,
    month,
    quater,
    year,
    date,
  }) => {
    let stats, fromMonth, toMonth;

    switch (quater) {
      case 1:
        fromMonth = 1;
        toMonth = 3;
        break;
      case 2:
        fromMonth = 4;
        toMonth = 6;
        break;
      case 3:
        fromMonth = 7;
        toMonth = 9;
        break;
      case 4:
        fromMonth = 10;
        toMonth = 12;
        break;

      default:
        quater = 0;
        break;
    }
    try {
      if (type === "PRODUCT") {
        stats = await shopService.statsByProduct(
          shopId,
          name,
          month,
          quater,
          fromMonth,
          toMonth,
          year,
          date
        );
      } else if (type === "CATEGORY") {
        stats = await shopService.statsByCategory(
          shopId,
          categoryId,
          month,
          quater,
          fromMonth,
          toMonth,
          year,
          date
        );
      }

      return resUtil.successful(200, stats);
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },

  statsByProduct: async (
    shopId,
    name,
    month,
    quater,
    fromMonth,
    toMonth,
    year,
    date
  ) => {
    try {
      const stats = await db.sequelize.query(
        `select p.id, p.name, sum(d.quantity * d.unitPrice) as 'revenue'
        from ecommerce.orderdetails as d, ecommerce.products as p, ecommerce.orders as o 
        where d.productId = p.id and o.id = d.orderId and p.shopId = :shopId and p.name like '%${name}%' ${
          month > 0 && month < 13 ? "and MONTH(o.createdAt) = :month" : ""
        } ${
          quater !== 0
            ? "and MONTH(o.createdAt) BETWEEN :fromMonth AND :toMonth"
            : ""
        } ${year > 0 ? "and YEAR(o.createdAt) = :year" : ""} ${
          date ? "and DATE(o.createdAt) = DATE(:date)" : ""
        }
        group by p.id
        order by sum(d.quantity * d.unitPrice) desc`,
        {
          replacements: {
            shopId: shopId,
            month: month,
            fromMonth: fromMonth,
            toMonth: toMonth,
            year: year,
            date: date,
          },
          type: QueryTypes.SELECT,
        }
      );
      return stats;
    } catch (error) {
      console.log(error);
    }
  },

  statsByCategory: async (
    shopId,
    categoryId,
    month,
    quater,
    fromMonth,
    toMonth,
    year,
    date
  ) => {
    try {
      const stats = await db.sequelize.query(
        `select c.id, c.name, sum(d.quantity * d.unitPrice) as 'revenue'
        from ecommerce.orderdetails as d, ecommerce.products as p, ecommerce.orders as o , ecommerce.categories c
        where d.productId = p.id and o.id = d.orderId and c.id = p.categoryId and p.shopId = :shopId ${
          categoryId > 0 ? "and p.categoryId = :categoryId" : ""
        } ${month > 0 && month < 13 ? "and MONTH(o.createdAt) = :month" : ""} ${
          quater !== 0
            ? "and MONTH(o.createdAt) BETWEEN :fromMonth AND :toMonth"
            : ""
        } ${year > 0 ? "and YEAR(o.createdAt) = :year" : ""} ${
          date ? "and DATE(o.createdAt) = DATE(:date)" : ""
        }
        group by c.id
        order by sum(d.quantity * d.unitPrice) desc`,

        {
          replacements: {
            shopId: shopId,
            categoryId: categoryId,
            month: month,
            fromMonth: fromMonth,
            toMonth: toMonth,
            year: year,
            date: date,
          },
          type: QueryTypes.SELECT,
        }
      );
      return stats;
    } catch (error) {
      console.log(error);
    }
  },
  getUserByShopId: async (shopId) => {
    try {
      const shop = await Shop.findByPk(shopId, { include: db.Seller });
      return resUtil.successful(200, shop.Seller.userId)
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },
};
module.exports = shopService;
