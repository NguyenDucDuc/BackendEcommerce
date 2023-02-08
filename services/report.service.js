const {Report} = require('../models')
const responseUtils = require('../utils/response.util')

module.exports = {
    create: async (customerId, shopId) => {
        try {
            const newReport = await Report.create({
                customerId: customerId,
                shopId: shopId
            })
            return responseUtils.created(newReport)
        } catch (error) {
            return responseUtils.serverError()
        }
    }
}