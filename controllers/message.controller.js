const { Message } = require("../schemas/message.schema");

module.exports = {
  create: async (req, res) => {
    try {
      const body = req.body;
      const newMessage = await Message.create({
        content: body.content,
        senderId: body.senderId,
        receiverId: body.receiverId,
      });
      await newMessage.save();
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
      const body = req.body;
      const query = req.query
      const listMessage = await Message.find({
        $or: [
          {
            senderId: query.senderId,
            receiverId: query.receiverId,
          },
          {
            receiverId: query.senderId,
            senderId: query.receiverId,
          }
        ],
      });
      return res.status(200).json({
        status: 200,
        data: listMessage,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
