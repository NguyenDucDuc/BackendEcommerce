const {Seller} = require('../models')
const responseUtil = require('../utils/response.util')


module.exports = {
    register: async (userId) => {
        try {
            const newSeller = await Seller.create({
                isConfirm: false,
                userId: userId
            })
            return responseUtil.created(newSeller)
        } catch (error) {
            return responseUtil.serverError()
        }
    }
}