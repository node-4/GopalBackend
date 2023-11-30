const mongoose = require('mongoose');
const orderItemSchema = new mongoose.Schema({
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
                required: true
        }
}, { _id: false });

const orderSchema = new mongoose.Schema({
        user: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: true
        },
        items: [orderItemSchema],
        deliveryAddress: {
                type: String,
                required: true,
        },
        status: {
                type: String,
                enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
                default: 'Pending',
        },
        sgst: {
                type: Number,
                required: true
        },
        cgst: {
                type: Number,
                required: true
        },
        deliveryCharge: {
                type: Number,
                required: true
        },
        subtotal: {
                type: Number,
                required: true
        },
        total: {
                type: Number,
                required: true
        }
}, {
        timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
