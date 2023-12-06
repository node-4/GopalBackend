const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const bannerSchema = new mongoose.Schema({
    restaurantId: {
        type: objectid,
        ref: "Restaurant"
    },
    title: {
        type: String
    },
    image: {
        type: String
    }
})
module.exports = mongoose.model('banner', bannerSchema)

