const mongoose = require('mongoose')


const conversationSchema = new mongoose.Schema({
    name: String,
    members: [
        {
            type: Number
        }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
}, {
    timestamps: true
})

const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = {Conversation}