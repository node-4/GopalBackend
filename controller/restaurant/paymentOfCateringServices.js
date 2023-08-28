const uuid = require("uuid");
const razerpay = require("razorpay");
const crypto = require("crypto");
const id = uuid.v4();
const paymentOfCatering = require("../../model/paymentOfCateringServices");
const bookingOfCatering = require("../../model/bookingOfCateringServices")
//const Wallet = require("../../models/wallet");
const userSchema = require("../../model/userCreate");
const restaurantSchema = require("../../model/restaurantCreate");

// const Razorpay = new razerpay({
//   key_id: "rzp_live_oe2m9rifPN1OM5",
//   key_secret: "lVgPoYfEbRchEnFISM6yJAdr",
// });

exports.CreatePaymentOfCateringByRestaurant = async (req, res) => {
  try {
    const bookingData = await bookingOfCatering.findById({_id: req.params.id });

    if (!bookingData || bookingData.length == 0) {
      return res.status(500).json({
        message: "No Booking  is their",
      });
    }

    console.log(bookingData._id);
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
      //userObject: userdata,
      bookingId:bookingData._id,
      restaurantId: bookingData.restaurantId,
    //  restaurantObject: restaurantData,

      //  payment_Id: result1.id,
      //  amount: result1.amount,
      //  amount_paid: result1.amount_paid,
      //  receipt: result1.receipt,
      //  product: req.body.product,
      //status: req.body.status,
    };
    console.log(DBData);
    const AmountData = await paymentOfCatering.create(DBData);
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



exports.GetpaymentOfCateringByRestaurantId = async (req, res) => {
    try {
      console.log(req.params.id)
      const Data = await paymentOfCatering.find({ restaurantId: req.params.id });
      console.log(Data)
      return res.status(200).send(Data);
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: err.message });
    }
  };

exports.GetAllPaymentsOfCateringByRestaurant = async (req, res) => {
  try {
    const Data = await paymentOfCatering.find();
    if (!Data || Data.length == 0)
    return res.status(404).send({ msg: "paymentOfCatering not found" });
    return res.status(200).json({ details: Data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


exports.GetPaymentOfCateringServicesByRestaurant = async (req, res) => {
  try {
    console.log(req.params.user)
    const Data = await paymentOfCatering.find({ user: req.params.user });
    return res.status(200).json({ details: Data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


exports.updatecateringPaymentByRestaurant = async (req, res) => {
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
    const updateData = await paymentOfCatering.findByIdAndUpdate(
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



  
exports.deletecateringsPaymentByRestaurant = async (req, res, next) => {
  try {
    console.log("hit Payment by id");

    const { id } = req.params;

    const deletedData = await paymentOfCatering.findOneAndDelete({
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

