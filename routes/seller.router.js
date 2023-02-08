const sellerController = require('../controllers/seller.controller')
const sellerMiddleware = require('../middlewares/seller.middleware')
const userMiddleware = require('../middlewares/user.middleware')

const sellerRouter = require('express').Router()

sellerRouter.post("/register", userMiddleware.verifyToken, sellerMiddleware.verifyRegister ,sellerController.register)

module.exports = {sellerRouter}