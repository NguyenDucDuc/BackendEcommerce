const {Customer} = require('../models')
const responseUtil = require('../utils/response.util')


module.exports = {
    register: async (body, userId) => {
        try {
            const newCustomer = await Customer.create({
                point: 0,
                userId: userId
            })
            return responseUtil.created(newCustomer)
        } catch (error) {
            return responseUtil.serverError()
        }
    }
}