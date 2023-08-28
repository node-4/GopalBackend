const CreateError = require("http-errors");

const Notification = require("../../model/notificationModel");
const token = require("../../middleware/jwt");
const Restaurant = require("../../model/restaurantCreate");

exports.getAllNotificationByUser = async (req, res, next) => {
  try {
    console.log("hit notification  ");
    const requiredResults = await Notification.find().lean();

    if (requiredResults.length === 0)
      return res.status(200).json({ message: "no Notification found" });

    return res.status(200).json({ requiredResults });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

exports.getNotificationByIdByUser = async (req, res, next) => {
  try {
    console.log("hit notification by id ");
    const requiredResults = await Notification.findById({
      _id: req.params.id,
    }).lean();

    if (requiredResults.length === 0)
      return res.status(200).json({ message: "no Notification found" });

    return res.status(200).json({ requiredResults });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};
