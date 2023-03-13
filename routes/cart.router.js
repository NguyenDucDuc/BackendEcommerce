const cartController = require('../controllers/cart.controller')
const userMiddleware = require('../middlewares/user.middleware')
const cartRouter = require('express').Router()

cartRouter.get("/products", userMiddleware.verifyToken , cartController.getProduct)
cartRouter.get("/", userMiddleware.verifyToken, cartController.getByUserId)

module.exports = {
    cartRouter
}