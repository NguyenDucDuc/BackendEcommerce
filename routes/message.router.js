const messageController = require('../controllers/message.controller')

const messageRouter = require('express').Router()
const userMiddleware = require('../middlewares/user.middleware')


messageRouter.post('/', userMiddleware.verifyToken ,messageController.create)
messageRouter.get('/:conversationId', messageController.getAllMessage)

module.exports = {messageRouter}