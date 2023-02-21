const {Customer} = require('../models')
const customerService = require('../services/customer.service')
const responseUtil = require('../utils/response.util')


module.exports = {
    getAll: async (req, res) => {
        try {
            const {code, data} = await customerService.getAll()
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    }
}