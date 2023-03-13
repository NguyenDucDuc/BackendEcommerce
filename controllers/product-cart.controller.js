const productCartService = require("../services/product-cart.service")
const responseUtil = require("../utils/response.util")

module.exports = {
    add: async (req, res) => {
        try {
            const body = req.body
            const {code, data} = await productCartService.add(body)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    },
    update: async (req, res) => {
        try {
            const body = req.body
            const {code, data} = await productCartService.update(body)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    }
}