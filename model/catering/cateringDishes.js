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
    dishIsOfRestaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
    },
    option: {
        type: String,
         enum:["veg","nonveg"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('cateringDish', dishSchema);
