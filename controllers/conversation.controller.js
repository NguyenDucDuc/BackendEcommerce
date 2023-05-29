const { Conversation } = require("../schemas/conversation.schema")
const {User, Customer, Seller, sequelize} = require('../models')

module.exports = {
    autoGenConversation: async (req, res) => {
        try {
            const seller = await Seller.findAll()
            const customer = await Customer.findAll()
            await Promise.all(seller.map(async (sellerItem) => {
                customer.map(async (customerItem) => {
                    await Conversation.create({
                        name: null,
                        members: [sellerItem.userId, customerItem.userId],
                        lastMessage: null
                    })
                })
            }))
            return res.status(200).json([])
        } catch (error) {
            console.log(error)      
        }
    },
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
            console.log(req.data.userId)
            let listConversation = await Conversation.find({
                members: {
                    $in: req.data.userId
                }
            }).populate('lastMessage')
            
            listConversation = await Promise.all(listConversation.map(async (conversationItem) => {
                const userId = conversationItem.members.filter((item) => item !== req.data.userId)
                const userInfo = await User.findByPk(userId[0])
                return {
                    ...conversationItem._doc,
                    name: `${userInfo?.dataValues?.firstName} ${userInfo?.dataValues?.lastName}` || '',
                    avatar: userInfo?.dataValues?.avatar || ''
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