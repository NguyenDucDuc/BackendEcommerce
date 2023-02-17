const customerController = require('../controllers/customer.controller')
const customerService = require('../services/customer.service')

const customerRouter = require('express').Router()

customerRouter.get("/", customerController.getAll)

module.exports = {customerRouter}