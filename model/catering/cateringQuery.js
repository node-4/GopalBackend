const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cateringServiceId: {
      type: mongoose.Types.ObjectId,
      ref: "cateringServices",
    },
    option: {
      type: String,
      enum: ["veg", "nonVeg", "veg_nonVeg"],
    },
    dishIsOfRestaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
    },
    dateOfOccasion:{
      type:String
    },
    items: [{
        type: mongoose.Types.ObjectId,
        ref: "cateringDish",
    }],
    noOfPlates: {
      type: Number,
      default: 0,
    },
    subTotal: {
      type: Number,
      default: 0,
    },
    sGST: {
      type: Number,
      default: 0,
    },
    cGST: {
      type: Number,
      default: 0,
    },
    serviceCharge: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cateringQuery", cartSchema);
