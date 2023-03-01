const { Op } = require('sequelize');
const db = require('../models');
const resUtil = require('../utils/res.util');

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
        await transaction.commit();
        return resUtil.clientError(404, 'Không tìm thấy cửa hàng');
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
        await transaction.rollback();
        return resUtil.clientError(404, 'Hiện tại sản phẩm đã hết hàng');
      }

      listPromise.push(
        db.OrderDetail.bulkCreate(listOrderDetail, {
          transaction: transaction,
        })
      );
      await Promise.all(listPromise);
      await transaction.commit();
      return resUtil.successful(200, [], 'Bạn đã đặt hàng thành công.');
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return resUtil.serverError();
    }
  },
  confirmOrder: async ({ orderId, action }) => {
    const transaction = await db.sequelize.transaction();
    try {
      const order = await db.Order.findByPk(orderId);

      switch (order.state) {
        case 4:
          return resUtil.clientError(404, 'Đơn hàng đã hoàn thành');
        case 0:
          return resUtil.clientError(404, 'Đơn hàng đã hủy');
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

      await transaction.commit();
      return resUtil.successful(200, order);
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return resUtil.serverError();
    }
  },
  getDetails: async ({ customerId, shopId, orderId }) => {
    try {
      const order = await db.Order.findOne({
        where: {
          [Op.and]: [
            orderId ? { id: orderId } : {},
            customerId ? { customerId: customerId } : {},
            shopId ? { shopId: shopId } : {},
          ],
        },
      });
      if (!order) {
        return resUtil.clientError(404, 'Đơn hàng không tồn tại');
      }
      const listOrderDetail = await db.OrderDetail.findAll({
        where: {
          orderId: order.id,
        },
      });
      return resUtil.successful(200, {
        ...order.dataValues,
        listOrderDetail: listOrderDetail,
      });
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },
  getOrder: async ({ shopId, customerId, state }) => {
    try {
      const listOrder = await db.Order.findAll({
        where: {
          [Op.and]: [
            state ? { state: state } : {},
            shopId ? { shopId: shopId } : {},
            customerId ? { customerId: customerId } : {},
          ],
        },
      });

      if (!listOrder.length) {
        return resUtil.clientError(404, 'Không có đơn hàng');
      }

      return resUtil.successful(200, listOrder);
    } catch (error) {
      console.log(error);
      return resUtil.serverError();
    }
  },
};
module.exports = orderService;
