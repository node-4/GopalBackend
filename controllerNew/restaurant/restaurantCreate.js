const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const Restaurant = require("../../modelNew/restaurant/restaurantCreate");
const { genToken } = require("../../middleware/jwt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
exports.registerRestaurant = async (req, res, next) => {
  try {
    const { name, email, address, tagline, contact, profile, role, option, } = req.body;
    const userdata = await Restaurant.findOne({ $and: [{ $or: [{ contact: req.body.contact }, { email: req.body.email }], role: req.body.role }] });
    if (!userdata) {
      let password = bcrypt.hashSync(req.body.password, 8);
      const newRestaurant = await Restaurant.create({ name, email, password, address, tagline, contact, profile, role, option, });
      if (!newRestaurant) {
        return res.status(400).send({ status: 400, msg: "restaurant not added" });
      } else {
        const accessToken1 = jwt.sign({ id: newRestaurant._id }, process.env.JWT_SECRET, { expiresIn: "365d", });
        if (!accessToken1) {
          return res.status(400).send({ status: 400, message: "cannot generate the token" });
        }
        return res.status(200).send({ status: 200, message: "restaurant create  successfully ", data: { newRestaurant, accessToken1 } });
      }
    } else {
      return res.status(400).send({ status: 400, msg: "restaurant already exit" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 500, message: "Server error" + error.message });
  }
};
exports.restaurantLogin = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({ status: 400, message: "email is required" });
    }
    if (!req.body.password) {
      return res.status(400).send({ status: 400, message: "password is required" });
    }
    const admin = await Restaurant.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(400).send({ status: 400, message: "Failed! restaurant passed doesn't exist" });
    }
    const passwordIsValid = bcrypt.compare(req.body.password, admin.password);
    if (!passwordIsValid) {
      return res.status(401).send({ status: 401, message: "Wrong password" });
    }
    const accessToken1 = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "365d", });
    return res.status(200).send({ status: 200, msg: "restaurant logged in successfully", accessToken: accessToken1, });

  } catch (err) {
    return res.status(500).send({ status: 500, message: "Internal server error while restaurant signing in", });
  }
};
exports.updateLocation = async (req, res, next) => {
  try {
    console.log('hit upload location of restaurant');
    const { latLng } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.user, { $set: { location: { type: 'Point', coordinates: latLng } } }, { new: true });
    if (!updatedRestaurant) {
      return res.status(400).send({ status: 400, msg: "cannot add the location" });
    } else {
      return res.status(200).send({ status: 200, message: "Location add  successfully ", data: updatedRestaurant });
    }
  } catch (error) {
    return res.status(500).send({ status: 500, message: "Server error" + error.message });
  }
}
exports.me = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.user);
    if (!restaurant) {
      return res.status(400).send({ status: 400, msg: "Restaurant not found" });
    } else {
      return res.status(200).send({ status: 200, message: "Restaurant found  successfully ", data: restaurant });
    }
  } catch (error) {
    return res.status(500).send({ status: 500, message: "Server error" + error.message });
  }
}
exports.updateMeRestaurant = async (req, res, next) => {
  try {
    console.log('hit restaurant update profile (updateMeRestaurant)');
    const { name, email, address, tagline, contact, profile, restaurantMenu } = req.body;
    const restaurant1 = await Restaurant.findById(req.user);
    if (!restaurant1) return next(createError(400, "cannot find the restaurant"));
    const userdata = await Restaurant.findOne({ $and: [{ $or: [{ contact: contact }, { email: email }], role: restaurant1.role, _id: { $ne: restaurant1._id } }] });
    if (userdata) {
      return res.status(400).send({ msg: "restaurant already exit" });
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.user, { $set: { name, email, address, contact, tagline, profile, restaurantMenu/* profile: profilePath, restaurantMenu: menuPath*/ } }, { new: true });
    if (!updatedRestaurant) {
      return res.status(400).send({ status: 400, msg: "cannot update the data of restaurant" });
    } else {
      return res.status(200).send({ status: 200, message: "Restaurant update  successfully ", data: updatedRestaurant });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 500, message: "Server error" + error.message });
  }
}