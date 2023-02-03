const {Seller} = require('../models')


module.exports = {
    register: async (userId) => {
        try {
            const newSeller = await Seller.create({
                isConfirm: true,
                userId: userId
            })
            return {
                code: 200,
                data: {
                    status: 200,
                    data: newSeller
                }
            }
        } catch (error) {
            return {
                code: 500,
                data: "Error"
            }
        }
    }
}