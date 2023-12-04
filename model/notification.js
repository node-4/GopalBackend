const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    receiverUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    body: {
        type: String,
        lowercase: true,
    },
    localeDate: {
        type: String,
        default: (new Date()).toDateString()
    },
    localeTime: {
        type: String,
        default: (new Date()).toLocaleTimeString()
    },
    isForAllUsers: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('Notification', notificationSchema);
