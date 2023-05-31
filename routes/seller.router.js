const sellerController = require('../controllers/seller.controller')
const sellerMiddleware = require('../middlewares/seller.middleware')
const userMiddleware = require('../middlewares/user.middleware')

const sellerRouter = require('express').Router()

sellerRouter.post("/", userMiddleware.verifyToken, sellerMiddleware.verifyRegister ,sellerController.register)
sellerRouter.get("/", sellerController.getAll)
sellerRouter.patch("/lock/:userId", sellerController.lock)
sellerRouter.patch("/un-lock/:userId", sellerController.unLock)
sellerRouter.get('/unofficial', userMiddleware.verifyToken, sellerMiddleware.verifyAdminOrStaff ,sellerController.getSellerUnofficial)
sellerRouter.get('/check-official', userMiddleware.verifyToken ,sellerController.checkSellerOfficial)
sellerRouter.post('/:userId/confirm', userMiddleware.verifyToken, sellerMiddleware.verifyAdminOrStaff ,sellerController.confirmSeller)
sellerRouter.post('/:userId/grant', userMiddleware.verifyToken, userMiddleware.verifyAdmin ,sellerController.grant)
sellerRouter.post('/:userId/remove-role', userMiddleware.verifyToken, userMiddleware.verifyAdmin, sellerController.removeRole)

module.exports = {sellerRouter}