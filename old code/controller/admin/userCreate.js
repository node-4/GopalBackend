const otpGenerator = require("otp-generator");
const createError = require("http-errors");

const { genToken } = require("../../middleware/jwt");
const User = require("../../model/userCreate");
const Otp = require("../../model/Otp");
const Cart = require("../../model/cart");
const Notification = require("../../model/notification");
const jwt = require("jsonwebtoken");

//const { sendSms } = require('../../middlewares/twilioSms');

exports.socialLoginAdmin = async (req, res) => {
  try {
    const { google_id, name, email } = req.body;

    const user = await User.findOne({ google_id: google_id });
    console.log(user);
    if (!user) {
      const data1 = {
        google_id: req.body.google_id,
        name: req.body.name,
        email: req.body.email,
        profileImage: req.body.profileImage,
      };

      const create = await User.create(data1);
      console.log(create);

      const accessToken1 = jwt.sign(
        { id: create._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.setHeader("x-api-key", /* "Bearer "*/ +accessToken1);
      return res.status(200).send({
        message: "logged in successfully",
        accessToken: accessToken1,
        data: create,
      });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.setHeader("x-api-key", /* "Bearer "*/ +accessToken);
    return res.status(200).send({
      message: "logged in successfully",
      accessToken: accessToken,
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: "internal server error" + err.message });
  }
};

exports.addDetailsOfUserByadmin = async (req, res, next) => {
  try {
    console.log("hit add details");
    const { name, address, pincode } = req.body;

    // console.log(req.user);

    const update = {
      name,
      address,
      pincode,
    };

    const userAddedDetails = await User.findByIdAndUpdate(req.user, update, {
      new: true,
      runValidators: true,
    });

    if (!userAddedDetails)
      return next(createError(400, "cannot update the user"));

    return res.status(200).json({ userAddedDetails });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};

exports.saveCurrentLocationOfUserByAdmin = async (req, res, next) => {
  try {
    console.log("hit save current user current location");

    const { latLng } = req.body;
    const [lat, lng] = latLng;

    const update = {
      currentLocation: {
        type: "Point",
        coordinates: [lng, lat],
      },
    };

    const userAddedDetails = await User.findByIdAndUpdate(req.user, update, {
      new: true,
      runValidators: true,
    });

    if (!userAddedDetails)
      return next(createError(400, "cannot update the user"));

    return res.status(200).json(userAddedDetails);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};


exports.getCurrentUserOfUserByAdmin = async (req, res, next) => {
  try {
    console.log("hit get current user")

    const user = await User.findById({ _id: req.user })
    console.log(user);

    if (!user) return next(createError(400, "user not found"));

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};

exports.editCurrentUserByAdmin = async (req, res, next) => {
  try {
    console.log("hit edit user details");
    const {
      name,
      email,
      mobile,
      address,
      pincode,
      profileImage,
      currentLocation,
      role,
      google_id,
    } = req.body;

    const update = {
      name,
      email,
      mobile,
      address,
      pincode,
      profileImage,
      //currentLocation,
      role,
      google_id,
    };

    const updatedUser = await User.findByIdAndUpdate(req.user, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) return next(createError(400, "cannot update the user"));

    return res.status(200).json({ updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};

exports.deleteUserByAdmin = async (req, res, next) => {
  try {
    console.log("hit delete category by id");
    const { categoryId } = req.params;

    const deletedUser = await User.findOneAndDelete({ _id: categoryId });

    if (!deletedUser) return next(createError(400, "cannot delete the user"));

    return res.status(200).json({ message: " deletion successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorname: error.name,
      message: error.message,
    });
  }
};
