const {Cart, sequelize} = require('../models')
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
    },
    getProduct: async (userId) => {
        try {
            console.log('123')
            const [products] = await sequelize.query(`
                select r.*, p.quantity
                from carts c, productcarts p, products r
                where c.id = p.cartId and p.productId = r.id and c.userId = ${userId}
            `)
            return responseUtil.getSuccess(products)
        } catch (error) {
            return responseUtil.serverError()
        }
    },
    getByUserId: async (userId) => {
        try {
            const cart = await Cart.findOne({where: {userId: userId}})
            return responseUtil.getSuccess(cart)
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    }
}