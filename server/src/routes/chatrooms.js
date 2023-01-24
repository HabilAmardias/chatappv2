const express = require('express');
const router = express.Router();
const Chatroom = require('../models/Chatroom');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(200).json({ status: 'failed', message: 'Token not found' })
        }
        jwt.verify(token, JWT_SECRET);
        const { senderId, receiverId } = req.body;
        const newChatroom = new Chatroom({ members: [senderId, receiverId] });
        const chatroom = await newChatroom.save();
        res.status(200).json(chatroom)
    } catch (err) {
        res.status(500).json(err);
    }

})

router.get('/:userId', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(200).json({ status: 'failed', message: 'Token not found' })
        }
        jwt.verify(token, JWT_SECRET);
        const { userId } = req.params;
        const chatroom = await Chatroom.find({ members: { $in: [userId] } });
        res.status(200).json(chatroom);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:firstUserId/:secondUserId', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(200).json({ status: 'failed', message: 'Token not found' })
        }
        jwt.verify(token, JWT_SECRET);
        const { firstUserId, secondUserId } = req.params;
        const chatroom = await Chatroom.findOne({ members: { $all: [firstUserId, secondUserId] } });
        res.status(200).json(chatroom);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;