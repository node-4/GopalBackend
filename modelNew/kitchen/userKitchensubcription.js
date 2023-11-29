const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const restaurantSchema = new mongoose.Schema(
        {
                kitchensubcriptionId: {
                        type: mongoose.Schema.ObjectId,
                        ref: "kitchensubcription"
                },
                user: {
                        type: objectid,
                        ref: "User"
                },
                paymentStatus: {
                        type: String,
                        enum: ["Pending", "Paid", "Failed"],
                        default: "Pending"
                },
                expired: {
                        type: Boolean,
                        default: true
                },
                expiredTime:{
                        type: Date,
                }
        }, { timestamps: true, }
);
module.exports = mongoose.model("userKitchensubcription", restaurantSchema);