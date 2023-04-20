const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
    content: String,
    senderId: Number,
    receiverId: Number
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

module.exports = {Message}