const customerController = require('../controllers/customer.controller')
const customerService = require('../services/customer.service')

const customerRouter = require('express').Router()

customerRouter.get("/", customerController.getAll)
customerRouter.get("/:userId", customerController.getDetail)
customerRouter.post("/check-bought-product", customerController.checkBoughtProduct)
customerRouter.post('/:userId/lock', customerController.lock)
customerRouter.post('/:userId/unlock', customerController.unlock)


module.exports = {customerRouter}