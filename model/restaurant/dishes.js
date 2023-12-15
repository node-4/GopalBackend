const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
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
dishSchema.plugin(mongoosePaginate);
dishSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('Dish', dishSchema);
