const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const chatroomSchema = new mongoose.Schema({
    members: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        unique: true
    }
})

chatroomSchema.plugin(uniqueValidator);

const Chatroom = mongoose.model('Chatroom', chatroomSchema);
module.exports = Chatroom;