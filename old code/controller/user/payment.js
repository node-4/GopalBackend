const razerpay = require("razorpay");
const crypto = require("crypto");
const uuid = require("uuid");
const id = uuid.v4();
const payment = require("../../model/payment");
const booking = require("../../model/booking");
//const Wallet = require("../../models/wallet");
const userSchema = require("../../model/userCreate");
const restaurantSchema = require("../../model/restaurantCreate");

// const Razorpay = new razerpay({
//   key_id: "rzp_live_oe2m9rifPN1OM5",
//   key_secret: "lVgPoYfEbRchEnFISM6yJAdr",
// });

exports.CreatePaymentOrder = async (req, res) => {
  try {
    const bookingData = await booking.findById({ _id: req.params.id });

    if (!bookingData || bookingData.length == 0) {
      return res.status(500).json({
        message: "No Booking  is their",
      });
    }

    console.log(bookingData.amount);
    console.log(bookingData.userId);
    console.log(bookingData.restaurantId);

    const userdata = await userSchema.findById({ _id: bookingData.userId });

    if (!userdata || userdata.length == 0) {
      return res.status(500).json({
        message: "No userdata  is their",
      });
    }

    console.log(userdata);

    const restaurantData = await restaurantSchema.findById({
      _id: bookingData.restaurantId,
    });

    if (!restaurantData || restaurantData.length == 0) {
      return res.status(500).json({
        message: "No restaurantData  is their",
      });
    }

    console.log(restaurantData);

    const data1 = {
      amount: bookingData.amount,
      currency: "INR",
      receipt: id,
      partial_payment: false,
    };
    //   console.log(data1.receipt);
    //  const result1 = await Razorpay.orders.create(data1);
    // console.log(result1);

    const DBData = {
      // orderId: result1.id,
      name: req.body.name,
     // invoice: "123" + req.body.name,
      // amount: bookingData.userobject.wallet,
      amount: /* result1.amount,*/ bookingData.amount,
      currency: "INR",
      receipt: data1.receipt,
      partial_payment: false,
      user: bookingData.userId,
      userObject: userdata,
      restaurantId: bookingData.restaurantId,
      restaurantObject: restaurantData,

      //  payment_Id: result1.id,
      //  amount: result1.amount,
      //  amount_paid: result1.amount_paid,
      //  receipt: result1.receipt,
      //  product: req.body.product,
      //status: req.body.status,
    };
    console.log(DBData);
    const AmountData = await payment.create(DBData);
    console.log(AmountData);
    // const AmountData = await payment.create(data1);
    bookingData.Status = "success";
    await bookingData.save();
    return res.status(200).json(AmountData);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

exports.GetPaymentsByUserId = async (req, res) => {
  try {
    console.log(req.params.user)
    const Data = await payment.find({ user: req.params.user });
    return res.status(200).json({ details: Data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
