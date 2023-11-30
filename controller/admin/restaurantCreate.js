const createError = require("http-errors");
const restaurantSchema = require("../../model/restaurant/restaurantCreate");
const { genToken } = require("../../middleware/jwt");
const bcrypt = require("bcryptjs");

exports.registerRestaurant = async (req, res, next) => {
  try {
    const { name, email, address, tagline, contact, profile, role, option, } = req.body;
    const userdata = await restaurantSchema.findOne({ $and: [{ $or: [{ contact: req.body.contact }, { email: req.body.email }], role: req.body.role }] });
    if (!userdata) {
      let password = bcrypt.hashSync(req.body.password, 8);
      const newRestaurant = await restaurantSchema.create({ name, email, password, address, tagline, contact, profile, role, option, });
      if (!newRestaurant) {
        return res.status(400).send({ status: 400, msg: "restaurant not added" });
      } else {
        return res.status(200).send({ status: 200, message: "restaurant create  successfully ", data: newRestaurant });
      }
    } else {
      return res.status(400).send({ status: 400, msg: "restaurant already exit" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 500, message: "Server error" + error.message });
  }
};
exports.updateLocationOfRestaurant = async (req, res, next) => {
  try {
    console.log('hit upload location of restaurant');
    const { latLng } = req.body;
    const updatedRestaurant = await restaurantSchema.findByIdAndUpdate(req.params.id, { $set: { location: { type: 'Point', coordinates: latLng } } }, { new: true });
    if (!updatedRestaurant) {
      return res.status(400).send({ status: 400, msg: "cannot add the location" });
    } else {
      return res.status(200).send({ status: 200, message: "Location add  successfully ", data: updatedRestaurant });
    }
  } catch (error) {
    return res.status(500).send({ status: 500, message: "Server error" + error.message });
  }
}
exports.restaurantById = async (req, res, next) => {
  try {
    const restaurant = await restaurantSchema.findById(req.params.id);
    if (!restaurant) {
      return res.status(400).send({ status: 400, msg: "Restaurant not found" });
    } else {
      return res.status(200).send({ status: 200, message: "Restaurant found  successfully ", data: restaurant });
    }
  } catch (error) {
    return res.status(500).send({ status: 500, message: "Server error" + error.message });
  }
}
exports.updateRestaurant = async (req, res, next) => {
  try {
    console.log('hit restaurant update profile (updateMeRestaurant)');
    const { name, email, address, tagline, contact, profile, restaurantMenu } = req.body;
    const updatedRestaurant = await restaurantSchema.findByIdAndUpdate(req.params.id, { $set: { name, email, address, contact, tagline, profile, restaurantMenu/* profile: profilePath, restaurantMenu: menuPath*/ } }, { new: true });
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
exports.deleteByRestaurant = async (req, res, next) => {
  try {
    console.log('hit delete category by id');
    const { id } = req.params;
    const deletedCategory = await restaurantSchema.findOneAndDelete({ _id: id });
    if (!deletedCategory) {
      return res.status(400).send({ status: 400, msg: "cannot delete the restaurant" });
    } else {
      return res.status(200).send({ status: 200, message: "Restaurant deletion successfull ", data: {} });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 500, message: "Server error" + error.message });
  }
}
exports.getAllrestaurant = async (req, res, next) => {
  try {
    console.log("hit get current restaurant");
    const restaurant = await restaurantSchema.find();
    if (restaurant.length == 0) {
      return res.status(404).send({ status: 404, message: "restaurant not found ", data: {} });
    }
    return res.status(200).send({ status: 200, message: "restaurant found  successfully ", data: restaurant });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorname: error.name, message: error.message, });
  }
};