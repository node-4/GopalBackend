const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const restaurantSchema = new mongoose.Schema(
        {
                platesName:{
                        type:String
                },
                dishIsOfRestaurant: {
                        type: mongoose.Types.ObjectId,
                        ref: 'Restaurant',
                },
                items: [{
                        type: objectid,
                        ref: "cateringDish"
                }],
                option: {
                        type: String,
                        enum: ["veg", "nonVeg", "veg_nonVeg"]
                }
        }, { timestamps: true, }
);
module.exports = mongoose.model("cateringService", restaurantSchema);