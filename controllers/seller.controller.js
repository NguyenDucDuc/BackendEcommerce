const {Seller} = require('../models')
const sellerService = require('../services/seller.service')


module.exports = {
    register: async (req, res) => {
        try {
            const {code, data} = await sellerService.register(req.data.userId)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: 500,
                data: "Error"
            })
        }
    }
}