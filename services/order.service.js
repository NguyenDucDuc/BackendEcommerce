const { Op } = require('sequelize');
const db = require('../models');

const STATUS_ORDER = {
  0: 'Đã hủy',
  1: 'Đợi xét duyệt',
  2: 'Đang chuẩn bị hàng',
  3: 'Đang vận chuyển',
  4: 'Đã nhận',
};

const orderService = {
  buyProduct: async ({ orderDetails, ...order }) => {
    const transaction = await db.sequelize.transaction();
    try {
      order = {
        ...order,
        status: STATUS_ORDER[order.state],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const shop = await db.Shop.findByPk(order.shopId);
      if (!shop) {
        transaction.commit();
        return {
          code: 404,
          data: {
            status: 404,
            message: 'Không tìm thấy cửa hàng',
          },
        };
      }

      const newOrder = await db.Order.create(order, {
        transaction: transaction,
      });

      let checkStock = true;
      const listOrderDetail = [];
      const listPromise = [];
      const listValidate = {
        ids: [],
        details: {},
      };
      orderDetails.forEach((item) => {
        listValidate.ids.push(item.productId);
        listValidate.details[item.productId] = item;
        listOrderDetail.push({
          ...item,
          shopName: shop.shopName,
          orderId: newOrder.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        listPromise.push(
          db.Product.decrement(
            { unitInStock: item.quantity },
            {
              where: {
                id: item.productId,
              },
              transaction: transaction,
            }
          ),
          db.Product.increment(
            { unitOnOrder: item.quantity },
            {
              where: {
                id: item.productId,
              },
              transaction: transaction,
            }
          )
        );
      });

      let listProduct = await db.Product.findAll({
        where: {
          id: {
            [Op.in]: listValidate['ids'],
          },
        },
      });

      for (let i = 0; i < listProduct.length; i++) {
        if (
          listProduct[i]['unitInStock'] <
          listValidate['details'][listProduct[i]['id']]['quantity']
        ) {
          checkStock = false;
          break;
        }
      }
      if (!checkStock) {
        transaction.rollback();
        return {
          code: 200,
          data: {
            status: 200,
            message: 'Hiện tại, sản phẩm đã hết hàng.',
          },
        };
      }

      listPromise.push(
        db.OrderDetail.bulkCreate(listOrderDetail, {
          transaction: transaction,
        })
      );
      await Promise.all(listPromise);
      transaction.commit();
      return {
        code: 200,
        data: {
          status: 200,
          message: 'Bạn đã đặt hàng thành công.',
        },
      };
    } catch (error) {
      console.log(error);
      transaction.rollback();
      return {
        code: 400,
        data: {
          status: 400,
          message: 'Đã có lỗi xảy ra !',
        },
      };
    }
  },
  confirmOrder: async ({ orderId, action }) => {
    const transaction = await db.sequelize.transaction();
    try {
      const order = await db.Order.findByPk(orderId);

      switch (order.state) {
        case 4:
          return {
            code: 200,
            data: {
              status: 200,
              message: 'Đã hoàn thành',
            },
          };
        case 0:
          return {
            code: 200,
            data: {
              status: 200,
              message: 'Đã hủy',
            },
          };
      }

      switch (action) {
        case 'DONE':
          await order.update(
            { state: order.state + 1, status: STATUS_ORDER[order.state + 1] },
            { transaction: transaction }
          );

          break;
        case 'CANCEL':
          const listOrderDetail = await db.OrderDetail.findAll({
            where: {
              orderId: orderId,
            },
          });

          let listPromise = listOrderDetail.reduce((list, detail) => {
            list.push(
              db.Product.increment(
                { unitInStock: detail.quantity },
                {
                  where: {
                    id: detail.productId,
                  },
                  transaction: transaction,
                }
              ),
              db.Product.decrement(
                { unitOnOrder: detail.quantity },
                {
                  where: {
                    id: detail.productId,
                  },
                  transaction: transaction,
                }
              )
            );
            return list;
          }, []);
          listPromise.push(
            order.update(
              {
                state: 0,
                status: STATUS_ORDER[0],
              },
              { transaction: transaction }
            )
          );

          await Promise.all(listPromise);
          break;
      }

      transaction.commit();

      return {
        code: 200,
        data: {
          status: 200,
          data: order,
        },
      };
    } catch (error) {
      console.log(error);
      transaction.rollback();
      return {
        code: 400,
        data: {
          status: 400,
          message: 'Đã có lỗi xảy ra.',
        },
      };
    }
  },
  getDetails: async ({ customerId, orderId }) => {
    try {
      const order = await db.Order.findOne({
        where: {
          id: orderId,
          customerId: customerId,
        },
      });
      if(!order){
        return {
          code: 200,
          data: {
            status: 200,
            message: 'Đơn hàng không tồn tại'
          }
        }
      }
      const listOrderDetail = await db.OrderDetail.findAll({
        where: {
          orderId: order.id,
        },
      });
      return {
        code: 200,
        data: {
          status: 200,
          data: {
            ...order.dataValues,
            listOrderDetail: listOrderDetail,
          },
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 400,
        data: {
          status: 400,
          message: 'Đã có lỗi xảy ra',
        },
      };
    }
  },
};
module.exports = orderService;
