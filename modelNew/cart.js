const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
    size: {
        type: String,
    },
    dishId: {
        type: mongoose.Types.ObjectId,
        ref: 'Dish',
        required: true
    },
    numPortions: {
        type: Number,
        default: 1
    },
    totalPrice: {
        type: Number,
    }
}, { _id: false })
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', cartSchema);
