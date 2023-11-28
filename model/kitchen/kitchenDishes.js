const mongoose = require('mongoose');
const dishSchema = new mongoose.Schema({
    foodImg: {
        type: String,
        default: "https://www.youtube.com/results?search_query=dubay+pathway+",
    },
    dishName: {
        type: String,
    },
    description: {
        type: String,
    },
    currency: {
        type: String,
        default: 'INR',
        enum: ['INR']
    },
    dishIsOfKitchen: {
        type: mongoose.Types.ObjectId,
        ref: 'Kitchen',
    },
    option: {
        type: String,
         enum:["veg","nonveg"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('kitchenDish', dishSchema);
