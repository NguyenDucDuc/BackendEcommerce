const shopServices = require("../services/shop.service")
const responseUtil = require("../utils/response.util")
const {Seller} = require('../models')



module.exports = {
    create: async (req, res) => {
        try {
            const body = req.body
            const seller = await Seller.findOne({where: {userId: req.data.userId}})
            const {code, data} = await shopServices.create(body, seller.id)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    }
}