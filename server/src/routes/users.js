const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', async (req, res) => {
    try {
        const usersData = await User.find({});
        res.json(usersData)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const newUser = new User({ username, password, email });
        const createdUser = await newUser.save();
        res.json(createdUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findAndAuth(email, password);
        if (findUser) {
            const token = jwt.sign({ sub: findUser._id }, JWT_SECRET);
            res.json({ user: findUser, token: token })
        } else {
            res.send(findUser)
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(200).json({ status: 'failed', message: 'Token not found' })
        }
        jwt.verify(token, JWT_SECRET);
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;