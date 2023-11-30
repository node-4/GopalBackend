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
                type: {
                        type: String,
                        enum: ["BLD", "LD", "L", "D"]
                },
                price: {
                        type: Number,
                },
                breakfastTiming: {
                        type: String,
                },
                lunchTiming: {
                        type: String,
                },
                dinnerTiming: {
                        type: String,
                },
                month: {
                        type: Number,
                        default: 0
                },
                typeOfSubscription: {
                        type: String,
                        enum: ["Weekly", "Monthly", "Quarterly"]
                },
                breakfast: [{
                        type: objectid,
                        ref: "kitchenDish"
                }],
                lunch: [{
                        type: objectid,
                        ref: "kitchenDish"
                }],
                dinner: [{
                        type: objectid,
                        ref: "kitchenDish"
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