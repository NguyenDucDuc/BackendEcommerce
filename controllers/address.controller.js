const {Address} = require('../models')
const addressService = require('../services/address.service')
const responseUtil = require('../utils/response.util')


module.exports = {
    currentAddress: async (req, res) => {
        try {
            const {code, data} = await addressService.currentAddress(req.data.userId)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    }
}