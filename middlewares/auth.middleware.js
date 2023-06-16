const db = require('../models');
const jwt = require('jsonwebtoken');

const auth = {
  verifyToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (token) {
        const accessToken = token.split(' ')[1];
        jwt.verify(
          accessToken,
          process.env.JWT_ACCESS_KEY,
          async (err, user) => {
            if (err) {
              return res.status(403).json({
                data: {
                  status: 403,
                  message: 'Access token không hợp lệ',
                },
              });
            }
            req.user = user;
            next();
          }
        );
      } else {
        return res.status(404).json({
          data: {
            status: 404,
            message: 'Không tìm thấy access token',
          },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  },
  verifyCustomer: async (req, res, next) => {
    try {
      auth.verifyToken(req, res, async () => {
        const customer = await db.Customer.findOne({
          where: {
            userId: req.user.userId,
          },
        });
        if (!customer) {
          return res.status(403).json({
            data: {
              status: 403,
              message: 'Không có quyền truy cập',
            },
          });
        }
        req.customerId = customer.id;
        next();
      });
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  },

  verifyAddReview: async (req, res, next) => {
    try {
      auth.verifyCustomer(req, res, async () => {
        const listOrder = await db.Order.findAll({
          where: {
            customerId: req.customerId,
            // state: 4,
          },
        });
        if (listOrder.length === 0) {
          return res.status(404).json({
            data: {
              status: 404,
              message: 'Không có sản phẩm',
            },
          });
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
        if (!productIds.includes(req.body.productId)) {
          return res.status(403).json({
            data: {
              status: 403,
              message: 'Không có quyền truy cập',
            },
          });
        }
        next();
      });
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  },

  verifyAdmin: async (req, res, next) => {
    try {
      auth.verifyToken(req, res, async () => {
        const admin = await db.Admin.findOne({
          where: {
            userId: req.user.userId,
          },
        });
        if (!admin) {
          return res.status(403).json({
            data: {
              status: 403,
              message: 'Không có quyền truy cập',
            },
          });
        }
        req.adminId = admin.id;
        next();
      });
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  },

  verifySeller: async (req, res, next) => {
    try {
      auth.verifyToken(req, res, async () => {
        const seller = await db.Seller.findOne({
          where: { userId: req.user.userId },
        });

        if (!seller || !seller.isConfirm) {
          return res.status(403).json({
            data: {
              status: 403,
              message: 'Không có quyền truy cập',
            },
          });
        }
        req.seller = seller;
        next();
      });
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  },

  verifyShop: async (req, res, next) => {
    try {
      auth.verifySeller(req, res, async () => {
        let shopId = req.body.shopId;
        if (!shopId) {
          return res.status(404).json({
            data: {
              status: 403,
              message: 'Vui lòng chọn cửa hàng',
            },
          });
        }
        const listShop = await req.seller.getShops();
        if (!listShop.some((shop) => shop.id === parseInt(shopId))) {
          return res.status(403).json({
            data: {
              status: 403,
              message: 'Không có quyền sử dụng dịnh vụ này trên cửa hàng này',
            },
          });
        }
        next();
      });
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  },

  verifyAddProduct: async (req, res, next) => {
    try {
      auth.verifySeller(req, res, async () => {
        let shopId = req.body.shopId;
        if (!shopId) {
          return res.status(404).json({
            data: {
              status: 403,
              message: 'Vui lòng chọn cửa hàng',
            },
          });
        }
        const listShop = await req.seller.getShops();
        if (!listShop.some((shop) => shop.id === parseInt(shopId))) {
          return res.status(403).json({
            data: {
              status: 403,
              message: 'Không có quyền sử dụng dịnh vụ này trên cửa hàng này',
            },
          });
        }
        next();
      });
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  },

  verifyDeleteAndUpdateProduct: async (req, res, next) => {
    try {
      auth.verifySeller(req, res, async () => {
        let shopId;
        if (req.params.productId) {
          let product = await db.Product.findByPk(req.params.productId);
          if (!product) {
            return res.status(404).json({
              data: {
                status: 404,
                message: 'Sản phẩm không tồn tại',
              },
            });
          }
          shopId = product.shopId;
        }

        const listShop = await req.seller.getShops();
        if (!listShop.some((shop) => shop.id === parseInt(shopId))) {
          return res.status(403).json({
            data: {
              status: 403,
              message: 'Không có quyền sử dụng dịnh vụ này trên cửa hàng này',
            },
          });
        }
        next();
      });
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  },

  verifyConfirmProductCustomer: async(req, res, next) => {
    try {
      auth.verifyToken(req, res, async () => {
        if (req.query.userId) {
          const customer = await db.Customer.findOne({where: {
            userId: req.query.userId
          }});
          if (customer) {
            const user = await customer.getUser();
            if (req.user.userId !== user.id) {
              return res.status(403).json({
                data: {
                  status: 403,
                  message: 'Không có quyền truy cập',
                },
              });
            }
          } 
        }
        next()
      })
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  },

  verifyConfirmProduct: async (req, res, next) => {
    try {
      auth.verifySeller(req, res, async () => {
        let shopId;
        if (req.body.orderId) {
          const order = await db.Order.findByPk(req.body.orderId);
          if (!order) {
            return res.status(404).json({
              data: {
                status: 404,
                message: 'Đơn hàng không tồn tại',
              },
            });
          }
          shopId = order.shopId;
        }

        const listShop = await req.seller.getShops();
        if (!listShop.some((shop) => shop.id === parseInt(shopId))) {
          return res.status(403).json({
            data: {
              status: 403,
              message: 'Không có quyền sử dụng dịnh vụ này trên cửa hàng này',
            },
          });
        }
        next();
      });
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  },

  verifyStatsShop: async (req, res, next) => {
    try {
      auth.verifySeller(req, res, async () => {
        let shopId = req.params.shopId;
        if (!shopId) {
          return res.status(404).json({
            data: {
              status: 403,
              message: 'Vui lòng chọn cửa hàng',
            },
          });
        }
        const listShop = await req.seller.getShops();
        if (!listShop.some((shop) => shop.id === parseInt(shopId))) {
          return res.status(403).json({
            data: {
              status: 403,
              message: 'Không có quyền sử dụng dịnh vụ này trên cửa hàng này',
            },
          });
        }
        next();
      });
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  },

  verifyGetOrderOfShopAndCustomer: (req, res, next) => {
    try {
      auth.verifyToken(req, res, async () => {
        if (req.query.shopId) {
          const shop = await db.Shop.findByPk(req.query.shopId);
          if (!shop) {
            req.query.shopId = null;
          } else {
            const seller = await shop.getSeller();
            if (req.user.userId !== seller.userId) {
              return res.status(403).json({
                data: {
                  status: 403,
                  message: 'Không có quyền truy cập',
                },
              });
            }
          }
        }

        if (req.query.userId) {
          const customer = await db.Customer.findOne({where: {
            userId: req.query.userId
          }});
          if (!customer) {
            req.query.userId = null;
          } else {
            const user = await customer.getUser();
            if (req.user.userId !== user.id && !req.query.shopId) {
              return res.status(403).json({
                data: {
                  status: 403,
                  message: 'Không có quyền truy cập',
                },
              });
            }
          }
        }

        if (!req.query.shopId && !req.query.userId) {
          return res.status(404).json({
            data: {
              status: 404,
              message: 'Đã có lỗi xảy ra',
            },
          });
        }

        next();
      });
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  },
};
module.exports = auth;
