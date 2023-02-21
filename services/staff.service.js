const {Staff, Seller} = require('../models')
const responseUtil = require('../utils/response.util')


module.exports = {
    confirmSeller: async (sellerId) => {
        try {
            const seller = await Seller.findByPk(sellerId)
            console.log(seller)
            if(seller){
                seller.isConfirm = true
                await seller.save()
                return responseUtil.updateSuccess(seller)
            }else {
                return {
                    code: 400,
                    data: {
                        status: 400,
                        data: [],
                        errors: "Seller doesn't not exists"
                    }
                }
            }
        } catch (error) {
            return responseUtil.serverError()
        }
    }
}