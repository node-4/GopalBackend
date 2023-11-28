const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const restaurantSchema = new mongoose.Schema(
        {
                kitchenId: {
                        type: objectid,
                        ref: "kitchen"
                },
                image: [{
                        img: {
                                type: String,
                        },
                }],
                date: {
                        type: String,
                },
        }, { timestamps: true, }
);
module.exports = mongoose.model("kitchenDailyImage", restaurantSchema);