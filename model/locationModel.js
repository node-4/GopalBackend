const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point']
    },
    coordinates: {
        type: [Number],
    }

}, {
    _id: false
});

module.exports = locationSchema;