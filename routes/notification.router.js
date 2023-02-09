const notificationController = require('../controllers/notification.controller')

const notificationRouter = require('express').Router()

notificationRouter.post("/", notificationController.create)

module.exports = {notificationRouter}