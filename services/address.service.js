const {Address} = require('../models')

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
                data: newAddress
            }
        } catch (error) {
            console.log(error)
            return {
                code: 500,
                data: "Error"
            }
        }
    }
}