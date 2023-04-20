const productCartController = require('../controllers/product-cart.controller')

const productCartRouter = require('express').Router()


productCartRouter.post("/", productCartController.add)
productCartRouter.patch("/", productCartController.update)
productCartRouter.post("/delete", productCartController.delete)


module.exports = {productCartRouter}