const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    //// rating will be implemented after implementing order and ratings functionality
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
    priceForSmallPortion: {
        type: Number,
    },
    priceForMediumPortion: {
        type: Number,
    },
    priceForLargePortion: {
        type: Number,
    },
    dishIsOfRestaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
    },
    dishIsOfKitchen: {
        type: mongoose.Types.ObjectId,
        ref: 'Kitchen',
    },
    currency: {
        type: String,
        default: 'INR',
        enum: ['INR']
    },
    numLikes: {
        type: Number,
        default: 0
    },
    option: {
        type: String,
        //  enum:["veg","nonveg"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Dish', dishSchema);
