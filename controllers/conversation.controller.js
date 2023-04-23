const { Conversation } = require("../schemas/conversation.schema")

module.exports = {
    create: async (req, res) => {
        try {
            const newConversation = await Conversation.create({
                name: req.body.name,
                members: req.body.members,
                lastMessage: null
            })
            return res.status(200).json({
                    status: 200,
                    data: newConversation
            })
        } catch (error) {
            console.log(error)
        }
    },
    getMyConversation: async (req, res) => {
        try {
            const listConversation = await Conversation.find({
                members: {
                    $in: req.query.userId
                }
            }).populate('messages').populate('lastMessage')
            return res.status(200).json({
                status: 200,
                data: listConversation
            })
        } catch (error) {
            console.log(error)
        }
    }
}