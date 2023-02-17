const {Seller} = require('../models')
const sellerService = require('../services/seller.service')
const responseUtil = require('../utils/response.util')


module.exports = {
    register: async (req, res) => {
        try {
            const {code, data} = await sellerService.register(req.data.userId)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    },
    getAll: async (req, res) => {
        try {
            const {code, data} = await sellerService.getAll()
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    }
}