const conversationController = require('../controllers/conversation.controller')

const conversationRouter = require('express').Router()

conversationRouter.post('/', conversationController.create)
conversationRouter.get('/', conversationController.getMyConversation)

module.exports = {conversationRouter}