const addressRouter = require('express').Router()
const addressController = require('../controllers/address.controller')
const userMiddleware = require('../middlewares/user.middleware')


addressRouter.get("/current", userMiddleware.verifyToken, addressController.currentAddress )
addressRouter.get("/", userMiddleware.verifyToken,addressController.getAll)
addressRouter.post("/", userMiddleware.verifyToken, addressController.create)
addressRouter.post("/:id/set-default", userMiddleware.verifyToken, addressController.setDefault)

module.exports = {addressRouter}