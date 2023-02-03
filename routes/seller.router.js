const sellerController = require('../controllers/seller.controller')
const userMiddleware = require('../middlewares/user.middleware')

const sellerRouter = require('express').Router()

sellerRouter.post("/register", userMiddleware.verifyToken, sellerController.register)

module.exports = {sellerRouter}