const CreateError = require("http-errors");

const Coupon = require("../../model/coupen");
const token = require("../../middleware/jwt")
const Notification = require("../../model/notification");
const Restaurant = require("../../model/restaurantCreate");


exports.getAllCouponsOfRestaurantByAdmin = async (req, res, next) => {
    try {
      console.log("hit restaurant get all coupons of himself ");
      const requiredResults = await Coupon.find().lean();
  
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


  
exports.getCouponsOfRestaurantByIdByAdmin = async (req, res, next) => {
    try {
      console.log("hit restaurant get all coupons of himself ");
      const requiredResults = await Coupon.find({
        restaurantId: req.params.restaurantId,
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