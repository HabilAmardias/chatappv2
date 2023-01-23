require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./src/models/User');
const Message = require('./src/models/Message');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB Connected')
    })
    .catch(err => {
        console.log(err)
    })

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', credentials: true
}));

const JWT_SECRET = process.env.JWT_SECRET;
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});

app.get('/users', async (req, res) => {
    try {
        const usersData = await User.find({});
        res.json(usersData)
    } catch (err) {
        console.log(err);
    }
})

app.post('/users', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const newUser = new User({ username, password, email });
        const createdUser = await newUser.save();
        res.json(createdUser);
    } catch (err) {
        console.log(err);
    }
})

app.post('/users/login', async (req, res) => {
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
        console.log(err);
    }
})

server.listen(8000, () => {
    console.log('Listening to port 8000')
})