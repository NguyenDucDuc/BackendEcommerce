const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
    content: String,
    creator: Object,
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    },
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

module.exports = {Message}