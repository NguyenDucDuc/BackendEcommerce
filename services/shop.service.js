const {Shop, Seller} = require('../models')
const responseUltil = require('../utils/response.util')

module.exports = {
    create: async (body, sellerId) => {
        try {
            
            const newShop = await Shop.create({
                shopName: body.shopName,
                rate: 0,
                desc: body.desc,
                image: body.image,
                sellerId: sellerId
            })
            return responseUltil.created(newShop)
        } catch (error) {
            console.log(error)
            return responseUltil.serverError()
        }
    }
}