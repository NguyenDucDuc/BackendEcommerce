const reportController = require('../controllers/report.controller')
const reportMiddleware = require('../middlewares/report.middleware')
const userMiddleware = require('../middlewares/user.middleware')
const reportRouter = require('express').Router()

reportRouter.post("/:shopId", userMiddleware.verifyToken, reportMiddleware.verifyCreate ,reportController.create)

module.exports = {reportRouter}