const CreateError = require("http-errors");

const Coupon = require("../../model/coupen");
const token = require("../../middleware/jwt");
const Notification = require("../../model/notification");
const Restaurant = require("../../model/restaurantCreate");

exports.createCouponByRestaurant = async (req, res) => {
  try {
    const existingCoupon = await Coupon.findOne({
      coupencode: req.body.coupencode,
    });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const coupon = new Coupon({
      restaurantId: req.body.restaurantId,
      restaurantName: req.body.restaurantName,
      restaurantEmail: req.body.restaurantEmail,
      restaurantcontact: req.body.restaurantcontact,
      discountPercent: req.body.discountPercent,
      coupencode: req.body.coupencode,
    });

    // Save coupon document
    await coupon.save();

    return res
      .status(201)
      .json({ message: "Coupon created successfully", coupon });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllCouponsOfRestaurant = async (req, res, next) => {
  try {
    console.log("hit restaurant get all coupons of himself ");
    const requiredResults = await Coupon.find({
      coupencode: req.params.coupencode,
    }).lean();

    if (requiredResults.length === 0)
      return res.status(200).json({ message: "no coupons found" });

    return res.status(200).json({ requiredResults });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

exports.deleteCouponById = async (req, res, next) => {
  try {
    console.log("hit restaurant delete coupon by id");

    const { couponId } = req.params;

    const deletedCoupon = await Coupon.findOneAndDelete({
      // restaurantId: req.user,
      _id: couponId,
    });

    if (!deletedCoupon)
      return next(CreateError(400, "cannot delete the coupon"));

    return res.status(200).json({ message: "coupon deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};
