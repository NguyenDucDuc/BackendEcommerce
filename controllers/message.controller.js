const { Conversation } = require("../schemas/conversation.schema");
const { Message } = require("../schemas/message.schema");
const {User} = require('../models')

module.exports = {
  create: async (req, res) => {
    try {
      const body = req.body;
      const user = await User.findByPk(req.data.userId)
      const creator = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar
      }
      const newMessage = await Message.create({
        content: body.content,
        conversation: body.conversation,
        creator: creator
      });
      const conversation = await Conversation.findById(body.conversation)
      await newMessage.save();
      await conversation.updateOne({$push: {messages: newMessage._id}})
      await conversation.updateOne({$set: {lastMessage: newMessage._id}})
      return res.status(200).json({
        status: 200,
        data: newMessage,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getAllMessage: async (req, res) => {
    try {
      const listMessage = await Message.find({
        conversation: req.params.conversationId
      })
      return res.status(200).json({
        status: 200,
        data: listMessage
      });
    } catch (error) {
      console.log(error);
    }
  },
};
