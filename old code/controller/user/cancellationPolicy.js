const CreateError = require("http-errors");

const Cancellation = require("../../model/cancellationPolicy");
const token = require("../../middleware/jwt")
const Notification = require("../../model/notification");
const Restaurant = require("../../model/restaurantCreate");


exports.getAllCancellationPolicyByUser = async (req, res, next) => {
    try {
      console.log("hit it  ");
      const requiredResults = await Cancellation.find().lean();
  
      if (requiredResults.length === 0)
        return res.status(200).json({ message: "no Cancellation policy found" });
  
      return res.status(200).json({ requiredResults });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errorName: error.name,
        message: error.message,
      });
    }
  };


  
exports.getCancellationPolicyByIdByUser = async (req, res, next) => {
    try {
      console.log("hit Cancellation  ");
      const requiredResults = await Cancellation.find({
       _id: req.params.id
      }).lean();
  
      if (requiredResults.length === 0)
        return res.status(200).json({ message: "no Cancellation policy found" });
  
      return res.status(200).json({ requiredResults });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errorName: error.name,
        message: error.message,
      });
    }
  };