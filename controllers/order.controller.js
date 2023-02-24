const orderService = require('../services/order.service');
const orderController = {
  buyProduct: async (req, res) => {
    const order = req.body;
    try {
      const { code, data } = await orderService.buyProduct(order);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  confirmOrder: async (req, res) => {
    try {
      const { code, data } = await orderService.confirmOrder(req.body);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  getDetails: async (req, res) => {
    try {
      const { code, data } = await orderService.getDetails(req.query);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};

module.exports = orderController;
