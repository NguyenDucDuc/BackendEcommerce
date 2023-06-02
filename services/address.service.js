const {Address} = require('../models')
const responseUtil = require('../utils/response.util')

module.exports = {
    create: async (body, userId) => {
        try {
            const newAddress = await Address.create({
                city: body.city,
                district: body.district,
                ward: body.ward,
                street: body.street,
                detail: body.detail,
                userId: userId
            })
            return {
                code: 200,
                data: {
                    status: 200,
                    data: newAddress
                }
            }
        } catch (error) {
            console.log(error)
            return {
                code: 500,
                data: {
                    status: 500,
                    data: "Error"
                }
            }
        }
    },
    currentAddress: async (userId) => {
        try {
            const address = await Address.findOne({where: {userId: userId, isSelect: true}})
            return responseUtil.getSuccess(address)
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    }
}