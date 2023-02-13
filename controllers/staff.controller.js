const {Staff} = require('../models')
const staffService = require('../services/staff.service')
const responseUtil = require('../utils/response.util')


module.exports = {
    confirmSeller: async (req, res) => {
        try {
            const sellerId = parseInt(req.params.sellerId)
            const {code, data} = await staffService.confirmSeller(sellerId)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    }
}