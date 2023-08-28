const razerpay = require("razorpay");
const crypto = require("crypto");
const uuid = require("uuid");
const id = uuid.v4();
const payment = require("../../model/payment");
const booking = require("../../model/booking");
//const Wallet = require("../../models/wallet");
const userSchema = require("../../model/userCreate");
const restaurantSchema = require("../../model/restaurantCreate");

exports.GetAllPaymentsByAdmin = async (req, res) => {
  try {
    const Data = await payment.find();
    if (!Data || Data.length == 0)
      return res.status(404).send({ msg: "payments not found" });
    return res.status(200).json({ details: Data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.GetPaymentsByUserIdByAdmin = async (req, res) => {
  try {
    console.log(req.params.user);
    const Data = await payment.find({ user: req.params.user });
    return res.status(200).json({ details: Data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// const Razorpay = new razerpay({
//   key_id: "rzp_live_oe2m9rifPN1OM5",
//   key_secret: "lVgPoYfEbRchEnFISM6yJAdr",
// });

exports.updatePaymentOrder = async (req, res) => {
  try {
    const Data = {
      payment_Id: req.body.payment_Id,
      amount: req.body.amount,
      invoice: req.body.invoice,
      status: req.body.status,
      receipt: req.body.receipt,
      amount_paid: req.body.amount_paid,
      name: req.body.name,
      type: req.body.type,
      date: req.body.date,
      paymentMethod: req.body.paymentMethod,
      product: req.body.product,
      orderStatus: req.body.orderStatus,
      user: req.body.user,
      restaurantId: req.body.restaurantId,
      orderId: req.body.orderId,
    };
    const updateData = await payment.findByIdAndUpdate(
      { _id: req.params.id },
      Data,
      { new: true }
    );

    if (!updateData || updateData.length == 0) {
      return res.status(500).json({
        message: "updateData is their",
      });
    }
 return res.status(200).send(updateData)

  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};



  
exports.deletePaymentById = async (req, res, next) => {
  try {
    console.log("hit Payment by id");

    const { id } = req.params;

    const deletedData = await payment.findOneAndDelete({
     // restaurantId: req.user,
      _id: id,
    });

    if (!deletedData)
      return next(CreateError(400, "cannot delete the policy"));

    return res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};
