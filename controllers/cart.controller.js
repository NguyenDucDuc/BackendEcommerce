const cartService = require("../services/cart.service");
const responseUtil = require("../utils/response.util");

module.exports = {
  getProduct: async (req, res) => {
    try {
      const { code, data } = await cartService.getProduct(req.data.userId);
      let totalProduct = 0;
      let totalPrice = 0;
      for (let i = 0; i < data.data.length; i++) {
        totalPrice += parseFloat(data.data[i].price * data.data[i].quantity)
        totalProduct += parseFloat(data.data[i].quantity)
      }
      const rsp = {
        code,
        data: {
          listProducts: data.data,
          totalProduct: totalProduct,
          totalPrice: totalPrice,
        },
      };
      res.status(code).json(rsp);
    } catch (error) {
      console.log(error);
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  },
  getByUserId: async (req, res) => {
    try {
      const {code, data} = await cartService.getByUserId(req.data.userId)
      res.status(code).json(data)
    } catch (error) {
      console.log(error)
      const { code, data } = responseUtil.serverError();
      res.status(code).json(data);
    }
  }
};
