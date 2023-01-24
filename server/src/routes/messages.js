const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(200).json({ status: 'failed', message: 'Token not found' })
        }
        jwt.verify(token, JWT_SECRET);
        const { conversationId, text, sender } = req.body;
        const newMessage = new Message({ conversationId, text, sender });
        const message = await newMessage.save();
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:conversationId', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(200).json({ status: 'failed', message: 'Token not found' })
        }
        jwt.verify(token, JWT_SECRET);
        const { conversationId } = req.params;
        const messages = await Message.find({ conversationId: conversationId }).populate('conversationId');
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;