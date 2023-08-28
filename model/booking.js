const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const bookingSchema = mongoose.Schema(
  {
    restaurantId: { type: objectid, ref: "Restaurant" },
    restaurantobject: { type: Object },
    Date: { type: String, default: new Date() },
    userId: { type: objectid, ref: "User" },
    userobject: { type: Object },
    Status: {
      type: String,
      default: "pending",
      enum: ["pending", "success", "ongoing"],
    },
    amount: { type: Number, default: 0 },
    payment: {
      type: String,
      enum: ["online", "cash"],
      default: "online",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookings", bookingSchema);
