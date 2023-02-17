const responseUtil = require("../utils/response.util")
const {Seller, Admin, Shop} = require('../models')

module.exports = {
    verifyCreate: async (req, res, next) => {
        try {
            const userId = req.data.userId
            if(userId) {
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
            } else {
                return res.status(400).json({
                    status: 400,
                    data: [],
                    errors: "You don't have access token"
                })
            }
            
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    },
    verifyBlock: async (req, res, next) => {
        try {
            const userId = req.data.userId
            const admin = await Admin.findOne({where: {userId: userId}})
            if(admin){
                next()
            }else {
                res.status(403).json({
                    status: 403,
                    data: [],
                    errors: "Forbidden"
                })
            }
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    },
    verifyDelete: async (req, res, next) => {
        try {
            const userId = req.data.userId
            const shopId = parseInt(req.params.shopId)
            const seller = await Seller.findOne({where: {userId: userId}})
            if(seller){
                const shop = await Shop.findByPk(shopId)
                if(shop){
                    if(shop.sellerId === seller.id) {
                        next()
                    } else {
                        return res.status(403).json({
                            status: 403,
                            data: [],
                            errors: "Forbidden !"
                        })
                    }
                }else {
                    return res.status(400).json({
                        status: 400,
                        data: [],
                        errors: "Shop doesn't exists"
                    })
                }
            } else {
                return res.status(400).json({
                        status: 403,
                        data: [],
                        errors: "Forbidden !"
                })
            }
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    }
}