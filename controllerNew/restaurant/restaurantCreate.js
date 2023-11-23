const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const Restaurant = require("../../model/restaurantCreate");
const { genToken } = require("../../middleware/jwt");
const mongoose = require("mongoose");
exports.registerRestaurant = async (req, res, next) => {
  try {
    const { name, email, address, tagline, contact, profile, role, option, } = req.body;
    const userdata = await Restaurant.findOne({ $and: [{ $or: [{ contact: req.body.contact }, { email: req.body.email }], role: req.body.role }] });
    if (!userdata) {
      let password = bcrypt.hashSync(req.body.password, 8);
      const newRestaurant = await Restaurant.create({ name, email, password, address, tagline, contact, profile, role, option, });
      if (!newRestaurant) return next(createError(400, "restaurant not added"));
      const token = await genToken({ id: newRestaurant._id, role: newRestaurant.role, });
      if (!token) return next(createError(400, "cannot generate the token"));
      return res.status(200).json({ token, newRestaurant, });
    } else {
      return res.status(400).send({ msg: "restaurant already exit" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorname: error.name, message: error.message, });
  }
};
exports.restaurantLogin = async (req, res, next) => {
  try {
    console.log("hit restaurant login");
    const { email, password } = req.body;
    if (!email || !password)
      return next(createError(400, "please provide email and password"));
    const restaurant = await Restaurant.findOne({ email: email }).select("+password");
    if (!restaurant)
      return next(createError(400, "No restaurant exists with the provided email"));
    if (!(await restaurant.checkPassword(password, restaurant.password)))
      return next(createError(400, "Incorrect email or password"));
    const token = await genToken({ id: restaurant._id, role: restaurant.role });
    if (!token) return next(createError(400, "cannot generate the token"));
    res.setHeader("Authorization", "Bearer " + token);
    return res.status(200).json({ tokrn: token, r: restaurant._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorname: error.name, message: error.message, });
  }
};
exports.updateLocation = async (req, res, next) => {
  try {
    console.log("hit upload location of restaurant");
    const { latLng } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.user, { location: { type: "Point", coordinates: latLng, }, }, { new: true });
    if (!updatedRestaurant)
      return next(createError(400, "cannot add the location"));
    return res.status(200).json({ updatedRestaurant });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorname: error.name, message: error.message, });
  }
};
exports.me = async (req, res, next) => {
  try {
    console.log("hit get current restaurant");
    const restaurant = await Restaurant.findById(req.user);
    return res.status(200).json({ restaurant });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorname: error.name, message: error.message, });
  }
};
exports.getAllrestaurant = async (req, res, next) => {
  try {
    console.log("hit get current restaurant");
    const restaurant = await Restaurant.find();
    return res.status(200).json({ restaurant });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorname: error.name, message: error.message, });
  }
};
exports.updateMeRestaurant = async (req, res, next) => {
  try {
    console.log("hit restaurant update profile (updateMeRestaurant)");
    const { name, email, address, tagline, contact, profile, option, } = req.body;
    const restaurant1 = await Restaurant.findById(req.user);
    if (!restaurant1) return next(createError(400, "cannot find the restaurant"));
    const userdata = await Restaurant.findOne({ $and: [{ $or: [{ contact: contact }, { email: email }], role: restaurant1.role, _id: { $ne: restaurant1._id } }] });
    if (userdata) {
      return res.status(400).send({ msg: "restaurant already exit" });
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.user, { $set: { name, email, address, contact, tagline, profile, option } }, { new: true })
    if (!updatedRestaurant)
      return next(createError(400, "cannot update the data of restaurant"));
    return res.status(200).json({ updatedRestaurant });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorname: error.name, message: error.message, });
  }
};
