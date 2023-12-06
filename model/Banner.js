const { model, Schema } = require("mongoose");
const bannerSchema = new Schema({
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
module.exports = model('banner', bannerSchema)

