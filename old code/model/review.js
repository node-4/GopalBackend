const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const objectid = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },
    restaurantId: {
      type: objectid,
      ref: "Restaurant",
    },
    userId: {
      type: objectid,
      ref: "User",
    },
    numRatings: {
      type: Number,
      default: 0,
    },
    reviewMessage:{type:String},
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("restaurantReview", reviewSchema);
