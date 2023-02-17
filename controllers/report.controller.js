const {Report} = require('../models')
const reportService = require('../services/report.service')
const responseUtil = require('../utils/response.util')


module.exports = {
    create: async (req, res) => {
        try {
            const customerId = req.data.userId
            const shopId = req.params.shopId
            const {code, data} = await reportService.create(customerId, shopId)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    },
    getAll: async (req, res) => {
        try {
            const {code, data} = await reportService.getAll()
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    }
}