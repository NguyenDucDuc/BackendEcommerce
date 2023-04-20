const messageController = require('../controllers/message.controller')

const messageRouter = require('express').Router()


messageRouter.post('/', messageController.create)
messageRouter.get('/', messageController.getAllMessage)

module.exports = {messageRouter}