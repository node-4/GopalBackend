const mongoose = require("mongoose");
const schema = mongoose.Schema;
const DocumentSchema = schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: "user"
  },
  orderId: {
    type: String
  },
  Orders: [{
    type: schema.Types.ObjectId,
    ref: "Order",
  }],
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
  subTotal: {
    type: Number,
    default: 0
  },
  cGst: {
    type: Number,
    default: 0
  },
  sGst: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  totalItem: {
    type: Number
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
}, { timestamps: true })
module.exports = mongoose.model("userOrder", DocumentSchema);