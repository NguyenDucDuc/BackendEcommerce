const { Conversation } = require("../schemas/conversation.schema")
const {User} = require('../models')

module.exports = {
    create: async (req, res) => {
        try {
            const newConversation = await Conversation.create({
                name: null,
                members: [...req.body.member, req.data.userId],
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
            let listConversation = await Conversation.find({
                members: {
                    $in: req.data.userId
                }
            }).populate('messages').populate('lastMessage')
            listConversation = await Promise.all(listConversation.map(async (conversationItem) => {
                const userId = conversationItem.members.filter((item) => item !== req.data.userId)
                const userInfo = await User.findByPk(userId[0])
                return {
                    ...conversationItem._doc,
                    name: userInfo.dataValues.userName
                }
            }))
            return res.status(200).json({
                status: 200,
                data: listConversation
            })
        } catch (error) {
            console.log(error)
        }
    }
}