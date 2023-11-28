const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    image: {
        type: String,
        default: "https://www.youtube.com/results?search_query=dubay+pathway+",
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('cateringService', dishSchema);
