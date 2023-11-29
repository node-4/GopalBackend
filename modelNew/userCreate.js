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
    google_id: { type: String },
    kitchensubcriptionId: [{
        type: mongoose.Schema.ObjectId,
        ref: "kitchensubcription"
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
