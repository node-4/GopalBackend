const mongoose = require("mongoose");
const schema = mongoose.Schema;
const DocumentSchema = schema({
  orderId: {
    type: String
  },
  userId: {
    type: schema.Types.ObjectId,
    ref: "User"
  },
  restaurantId: {
    type: schema.Types.ObjectId,
    ref: "Restaurant",
  },
  size: {
    type: String,
  },
  dishId: {
    type: mongoose.Types.ObjectId,
    ref: 'Dish',
    required: true
  },
  numPortions: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  cGst: {
    type: Number,
    default: 0
  },
  sGst: {
    type: Number,
    default: 0
  },
  subTotal: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  address: {
    houseFlat: {
      type: String,
    },
    appartment: {
      type: String,
    },
    landMark: {
      type: String,
    },
    houseType: {
      type: String,
    },
  },
  orderStatus: {
    type: String,
    enum: ["unconfirmed", "confirmed"],
    default: "unconfirmed",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  preparingStatus: {
    type: String,
    enum: ["pending", "Reject", "New", "Preparing", "Ready", "out_for_delivery", "delivered"],
    default: "pending"
  },
  deliveryStatus: {
    type: String,
    enum: ["assigned", "out_for_delivery", "delivered", ""],
    default: ""
  },
}, { timestamps: true })
module.exports = mongoose.model("Order", DocumentSchema);