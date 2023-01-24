const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chatroom',
    },
    text: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    time: {
        type: Date, default: Date.now
    }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;