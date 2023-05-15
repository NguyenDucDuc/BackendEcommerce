const sellerController = require('../controllers/seller.controller')
const sellerMiddleware = require('../middlewares/seller.middleware')
const userMiddleware = require('../middlewares/user.middleware')

const sellerRouter = require('express').Router()

sellerRouter.post("/", userMiddleware.verifyToken, sellerMiddleware.verifyRegister ,sellerController.register)
sellerRouter.get("/", sellerController.getAll)
sellerRouter.patch("/lock/:userId", sellerController.lock)
sellerRouter.patch("/un-lock/:userId", sellerController.unLock)
sellerRouter.get('/unofficial', sellerController.getSellerUnofficial)
sellerRouter.get('/check-official', userMiddleware.verifyToken ,sellerController.checkSellerOfficial)
sellerRouter.post('/:userId/confirm', sellerController.confirmSeller)

module.exports = {sellerRouter}