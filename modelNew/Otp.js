const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    mobile: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'login',
        enum: ['login']
    },
}, {
    timestamps: true
})



module.exports = mongoose.model('Otp', otpSchema);
