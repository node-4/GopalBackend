const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const restaurantSchema = new mongoose.Schema(
        {
                kitchenId: {
                        type: objectid,
                        ref: "kitchen"
                },
                plan: {
                        type: String,
                },
                price: {
                        type: String,
                },
                month: {
                        type: Number,
                        default: 0
                },
                breakfast: [{
                        type: objectid,
                        ref: "Dish"
                }],
                lunch: [{
                        type: objectid,
                        ref: "Dish"
                }],
                dinner: [{
                        type: objectid,
                        ref: "Dish"
                }],
                noOfuser: {
                        type: Number,
                        default: 0
                },
                user: [{
                        type: objectid,
                        ref: "User"
                }],
        }, { timestamps: true, }
);
module.exports = mongoose.model("kitchensubcription", restaurantSchema);