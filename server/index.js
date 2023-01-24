require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./src/routes/users');
const messageRoute = require('./src/routes/messages');
const chatroomRoute = require('./src/routes/chatrooms');
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


app.use('/users', userRoute);
app.use('/messages', messageRoute);
app.use('/chatrooms', chatroomRoute);


app.listen(8000, () => {
    console.log('Listening to port 8000')
})