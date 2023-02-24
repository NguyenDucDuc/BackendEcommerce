const { QueryTypes } = require('sequelize');
const db = require('../models');
const adminService = {
  stats: async ({ shopId, type, month, quater, year, date }) => {
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
      switch (type) {
        case 'TOTAL_PRODUCT':
          stats = await adminService.statsByTotalProduct(
            shopId,
            month,
            quater,
            fromMonth,
            toMonth,
            year,
            date
          );
          break;
        case 'FREQUENCY':
          stats = await adminService.statsByFrequency(
            shopId,
            month,
            quater,
            fromMonth,
            toMonth,
            year,
            date
          );
          break;

        default:
          stats = null;
          break;
      }

      return {
        code: 200,
        data: {
          status: 200,
          data: stats,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  //   Thống kê tổng sản phẩm mà shop kinh doanh (bán được)
  statsByTotalProduct: async (
    shopId,
    month,
    quater,
    fromMonth,
    toMonth,
    year,
    date
  ) => {
    try {
      const stats = await db.sequelize.query(
        `select s.shopName as 'name', sum(d.quantity) as 'quantity', sum(d.quantity * d.unitPrice) as 'revenue'
          from ecommerce.orderdetails as d, ecommerce.products as p, ecommerce.orders as o, ecommerce.shops s 
          where d.productId = p.id and o.id = d.orderId and p.shopId = s.id ${
            shopId > 0 ? 'and p.shopId = :shopId' : ''
          } ${
          month > 0 && month < 13 ? 'and MONTH(o.createdAt) = :month' : ''
        } ${
          quater !== 0
            ? 'and MONTH(o.createdAt) BETWEEN :fromMonth AND :toMonth'
            : ''
        } ${year > 0 ? 'and YEAR(o.createdAt) = :year' : ''} ${
          date ? 'and DATE(o.createdAt) = DATE(:date)' : ''
        }
          group by s.id
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

  //   Thống kê tần suất bán hàng
  statsByFrequency: async (
    shopId,
    month,
    quater,
    fromMonth,
    toMonth,
    year,
    date
  ) => {
    try {
      const stats = await db.sequelize.query(
        `select s.shopName as 'Ten shop', sum(d.quantity) as 'Tong san pham ban duoc', sum(d.quantity * d.unitPrice) as 'Doanh thu'
        from ecommerce.orderdetails as d, ecommerce.products as p, ecommerce.orders as o, ecommerce.shops s 
              where d.productId = p.id and o.id = d.orderId and p.shopId = s.id ${
                shopId > 0 ? 'and p.shopId = :shopId' : ''
              } ${
          month > 0 && month < 13 ? 'and MONTH(o.createdAt) = :month' : ''
        } ${
          quater !== 0
            ? 'and MONTH(o.createdAt) BETWEEN :fromMonth AND :toMonth'
            : ''
        } ${year > 0 ? 'and YEAR(o.createdAt) = :year' : ''} ${
          date ? 'and DATE(o.createdAt) = DATE(:date)' : ''
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
};
module.exports = adminService;
