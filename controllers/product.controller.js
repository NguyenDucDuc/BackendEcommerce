const productService = require('../services/product.service');
const promotionService = require('../services/promotion.service');
module.exports = {
  getProductByKw: async (req, res) => {
    try {
      let params = req.query;
      params.page = params.page === undefined ? 1 : params.page;
      params.name = params.name === undefined ? '' : params.name;
      await promotionService.validateExpiredPromotion();

      const { code, data } = await productService.getProductByKw(params);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  getProductTrend: async (req, res) => {
    try {
      await promotionService.validateExpiredPromotion();
      const { code, data } = await productService.getProductTrend();
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  getProductByID: async (req, res) => {
    try {
      await promotionService.validateExpiredPromotion();
      const { code, data } = await productService.getProductByID(req.params.id);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },

  addProduct: async (req, res) => {
    let attributes = { ids: [], list: [] };
    let { ids, list, ...product } = req.body;
    attributes.ids = JSON.parse(ids);
    attributes.list = JSON.parse(list);
    if (req?.files) {
      product.image = req.files.image;
    }
    product.isActive = true;
    product.sku = new Date().getTime();
    product.rate = 0;
    product.unitOnOrder = 0;
    product.createAt = new Date();
    product.updateAt = new Date();
    try {
      const { code, data } = await productService.addProduct(
        product,
        attributes
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  updateProduct: async (req, res) => {
    let attributes = { ids: [], list: [] };
    let { ids, list, ...product } = req.body;
    attributes.ids = JSON.parse(ids);
    attributes.list = JSON.parse(list);
    if (req?.files) {
      product.image = req.files.image;
    }
    let productId = req.params.productId;
    try {
      const { code, data } = await productService.updateProduct(
        productId,
        product,
        attributes
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { code, data } = await productService.deleteProductV2(
       parseInt(req.params.productId)
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },

  compareProduct: async (req, res) => {
    const { productId1, productId2 } = req.body;
    try {
      const { code, data } = await productService.compareProduct(
        parseInt(productId1),
        parseInt(productId2)
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  getImagesById: async (req, res) => {
    try {
      const { code, data } = await productService.getImagesById(req.params);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  addImageForProduct: async (req, res) => {
    try {
      const { code, data } = await productService.addImageForProduct({
        productId: req.params.id,
        ...req.body,
      });
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
