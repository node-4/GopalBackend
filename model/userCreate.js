const mongoose = require('mongoose');
const locationSchema = require('./locationModel');

const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        default: '',
        lowercase: true
    },
    address: {
        type: String,
        trim: true,
        default: '',
        lowercase: true
    },
    pincode: {
        type: String,
        trim: true,
        default: ''
    },
    profileImage: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user']
    },
    currentLocation: {
        type: locationSchema
    },
    otp: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    google_id: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
