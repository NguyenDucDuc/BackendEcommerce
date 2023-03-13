const addressRouter = require('express').Router()
const addressController = require('../controllers/address.controller')
const userMiddleware = require('../middlewares/user.middleware')


addressRouter.get("/current", userMiddleware.verifyToken, addressController.currentAddress )

module.exports = {addressRouter}