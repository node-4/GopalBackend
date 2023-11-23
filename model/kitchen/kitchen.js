const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const locationSchema = require("../locationModel");
const objectid = mongoose.Schema.Types.ObjectId;
const restaurantSchema = new mongoose.Schema(
    {
        restaurantId: {
            type: objectid,
            ref: "Restaurant"
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        address: {
            type: String,
        },
        profile: {
            type: String,
            default: "",
        },
        contact: {
            type: String,
        },
        location: {
            type: locationSchema,
        },
        radius: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("kitchen", restaurantSchema);
