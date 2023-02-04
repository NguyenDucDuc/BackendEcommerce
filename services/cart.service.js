const {Cart} = require('../models')
const responseUtil = require('../utils/response.util')

module.exports = {
    create: async (userId) => {
        try {
            const newCart = await Cart.create({
                userId: userId
            })
            return responseUtil.created(newCart)
        } catch (error) {
            return responseUtil.serverError()
        }
    }
}