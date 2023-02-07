const responseUtil = require("../utils/response.util")
const {Seller} = require('../models')

module.exports = {
    verifyCreate: async (req, res, next) => {
        try {
            const userId = req.data.userId
            const sellerId = await Seller.findOne({where: {userId: userId}})
            if(sellerId){
                next()
            }else {
                res.status(403).json({
                    status: 403,
                    data: [],
                    errors: "Fobidden"
                })
            }
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    }
}