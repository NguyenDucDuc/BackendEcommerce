const responseUtil = require("../utils/response.util")
const {ProductCart} = require("../models")

module.exports = {
    add: async (body) => {
        try {
            const productCart = await ProductCart.findOne({where: {
                productId: body.productId,
                cartId: body.cartId,
            }})
            if(productCart){
                productCart.quantity = productCart.quantity + 1
                await productCart.save()
                return responseUtil.created(productCart)
            }else {
                const newProductCart = await ProductCart.create({
                    productId: body.productId,
                    cartId: body.cartId,
                    quantity: body.quantity,
                    unitPrice: body.unitPrice
                })
                return responseUtil.created(newProductCart)
            }
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    },
    update: async (body) => {
        try {
            const productCart = await ProductCart.findOne({where: {productId: body.productId}})
            productCart.quantity = body.quantity
            await productCart.save()
            return responseUtil.updateSuccess(productCart)
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    },
    delete: async (body) => {
        try {
            const productCart = await ProductCart.findOne({
                where: {
                    productId: body.productId,
                    cartId: body.cartId
                }
            })
            if(productCart){
                await productCart.destroy()
                return {
                    code: 200,
                    data: {
                        status: 200,
                        data: productCart
                    }
                }
            } else {
                return {
                    code: 400,
                    data: {
                        status: 400,
                        data: [],
                        message: "Bad request"
                    }
                }
            }
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    }
}