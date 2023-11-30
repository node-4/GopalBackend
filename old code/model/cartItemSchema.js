const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    dishId: {
        type: mongoose.Types.ObjectId,
        ref: 'Dish',
        required: true
    },
    numPortions : {
        type: Number,  /// from front end
        default: 1
    },
    totalPrice:{
        type: Number,  /// from front end     (price per portion * numportions)
        required: true
    }       
},{
    _id: false
})

module.exports = cartItemSchema;
