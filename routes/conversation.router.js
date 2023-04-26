const conversationController = require('../controllers/conversation.controller')
const userMiddleware = require('../middlewares/user.middleware')

const conversationRouter = require('express').Router()

conversationRouter.post('/', userMiddleware.verifyToken ,conversationController.create)
conversationRouter.get('/', userMiddleware.verifyToken ,conversationController.getMyConversation)

module.exports = {conversationRouter}