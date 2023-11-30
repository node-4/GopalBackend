const mongoose = require("mongoose");
const schema = mongoose.Schema;
const addressSchema = new mongoose.Schema({
    address: {
        type: String,
    },
    appartment: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    user: {
        type: schema.Types.ObjectId,
        ref: "user",
    },
    addressType: {
        type: String,
        enum: ["BreakfastLunch", "Dinner", "Other"]
    },
}, { timestamps: true });
module.exports = mongoose.model("Address", addressSchema);