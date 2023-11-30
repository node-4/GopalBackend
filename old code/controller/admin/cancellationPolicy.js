const CreateError = require("http-errors");

const cancellation  = require("../../model/cancellationPolicy");
const token = require("../../middleware/jwt")
const Notification = require("../../model/notification");
const Restaurant = require("../../model/restaurantCreate");

exports.createCancellationPolicy = async (req, res, next) => {
  try {
    console.log("hit create CancellationPolicy ");

    const {msg} = req.body;
   // const restaurant = Restaurant.findById(req.user);

    const msgData = await cancellation.create({
    msg:msg
    });
    console.log(msgData);

    // const promiseArray = await Promise.all([restaurant, newCoupon])

    // await Notification.create({
    //     body: `use coupon code ${promiseArray[1].name} to avail a discount of ${promiseArray[1].discountPercent} at ${promiseArray[0].name}`,
    //     isForAllUsers: true
    // });

    if (!msgData) return res.status(400).send({msg: "cannot create new msg"});

    return res.status(200).send(msgData)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

exports.getCancellationPolicy = async (req, res, next) => {
  try {
    console.log("hit it ");
    const requiredResults = await cancellation.find({
    _id: req.params.id,
    }).lean();

    if (requiredResults.length === 0)
      return res.status(200).json({ message: "no CancellationPolicy found" });

    return res.status(200).json({ requiredResults });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};


exports.getAllCancellationPolicy = async (req, res, next) => {
  try {
    console.log("hit it ");
    const requiredResults = await cancellation.find().lean();

    if (requiredResults.length === 0)
      return res.status(200).json({ message: "no CancellationPolicy found" });

    return res.status(200).json({ requiredResults });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

exports.deleteCancellationPolicyById = async (req, res, next) => {
  try {
    console.log("hit CancellationPolicy  by id");

    const { id } = req.params;

    const deletedPolicy = await cancellation.findOneAndDelete({
     // restaurantId: req.user,
      _id: id,
    });

    if (!deletedPolicy)
      return next(CreateError(400, "cannot delete the policy"));

    return res.status(200).json({ message: "Policy deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};
