const shopController = require('../controllers/shop.controller')
const shopMiddleware = require('../middlewares/shop.middleware')
const userMiddleware = require('../middlewares/user.middleware')

const shopRouter = require('express').Router()

shopRouter.post("/create", userMiddleware.verifyToken, shopMiddleware.verifyCreate  , shopController.create)
shopRouter.patch("/block/:id", userMiddleware.verifyToken, shopMiddleware.verifyBlock, shopController.block)
shopRouter.patch("/unlock/:id", userMiddleware.verifyToken, shopMiddleware.verifyBlock, shopController.unLock)

module.exports = {shopRouter}