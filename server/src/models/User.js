const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 6,
        unique: true
    },
    password: {
        required: true,
        type: String,
        minLength: 8,
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

userSchema.statics.findAndAuth = async function (email, password) {
    const findUser = await this.findOne({ email });
    const isValid = await bcrypt.compare(password, findUser.password);
    return isValid ? findUser : false;
}

userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    } else {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User