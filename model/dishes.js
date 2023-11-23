const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    //// rating will be implemented after implementing order and ratings functionality
    foodImg: {
        type: String,
        default:"https://www.youtube.com/results?search_query=dubay+pathway+",
        trim: true,
        required: true
    },
    dishName: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    priceForSmallPortion: {
        type: Number,
        required: true
    },
    priceForMediumPortion: {
        type: Number,
        required: true
    },
    priceForLargePortion: {
        type: Number,
        required: true
    },
    dishIsOfRestaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    currency: {
        type: String,
        default: 'INR',
        enum: ['INR']
    },
    numLikes:{
        type: Number,
        default: 0
    },
    option:{
        type:String,
      //  enum:["veg","nonveg"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Dish', dishSchema);
