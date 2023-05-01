const { Promotion } = require("../models");
const randomString = require("randomstring");

module.exports = {
  create: async (req, res) => {
    try {
      const body = req.body;
      const code = randomString.generate(10);
      const newPromotion = await Promotion.create({
        code,
        desc: body.desc,
        value: body.value,
        isActive: 1,
        dateEnd: body.dateEnd,
        shopId: body.shopId,
        productId: body.productId,
      });
      return res.status(200).json({
        status: 200,
        data: newPromotion,
      });
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const params = req.params;
      if (params) {
        const promotion = await Promotion.findByPk(+params.promotionId);
        await promotion.destroy();
        return res.status(200).json({
          status: 200,
          data: promotion,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
        const params = req.params
        const body = req.body
        const newPromotion = await Promotion.update({
            desc: body.desc,
            value: body.value,
            dateEnd: body.dateEnd
        }, {where: {id: +params.promotionId}})
        const afterUpdatedPromotion = await Promotion.findByPk(params.promotionId)
        return res.status(200).json({
            status: 200,
            data: afterUpdatedPromotion
        })
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const params = req.params
      const limit = +req.query.limit || 10
      const listPromostion = await Promotion.findAll({
        where: {
          shopId: params.shopId,
          isActive: true
        },
        limit: limit,
        offset: req.query.page ? (req.query.page - 1) * limit : null
      })
      return res.status(200).json({
        status: 200,
        data: listPromostion
      })
    } catch (error) {
      console.log(error)
    }
  }
};
