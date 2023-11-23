const createError = require("http-errors");
const restaurantSchema = require("../../model/restaurantCreate");
const { genToken } = require("../../middleware/jwt");
const bcrypt = require("bcryptjs");
exports.registerRestaurant = async (req, res, next) => {
  try {
    const { name, email, address, tagline, contact, profile, role, option, } = req.body;
    const userdata = await restaurantSchema.findOne({ $and: [{ $or: [{ contact: req.body.contact }, { email: req.body.email }], role: req.body.role }] });
    if (!userdata) {
      let password = bcrypt.hashSync(req.body.password, 8);
      const newRestaurant = await restaurantSchema.create({ name, email, password, address, tagline, contact, profile, role, option, });
      if (!newRestaurant) return next(createError(400, "restaurant not added"));
      return res.status(200).json({ newRestaurant, });
    } else {
      return res.status(400).send({ msg: "restaurant already exit" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorname: error.name, message: error.message, });
  }
};



exports.signIn = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({ message: "email is required" });
    }
    if (!req.body.password) {
      return res.status(400).send({ message: "password is required" });
    }
    const admin = await restaurantSchema.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(400).send({ message: "Failed! User passed doesn't exist" });
    }
    const requiredOtp = await Otp.findOne({ email: req.body.email });
    if (requiredOtp) {
      const passwordIsValid = bcrypt.compareSync(req.body.password, requiredOtp.password);
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Incorrect email or password" });
      }
      const token = await genToken({ id: restaurant._id, role: restaurant.role });
      return res.status(200).send({ msg: "User logged in successfully", accessToken: token, });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal server error while User signing in", });
  }
};
exports.restaurantLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(createError(400, ""));
    const restaurant = await restaurantSchema.findOne({ email: email }).select("+password");
    if (!restaurant)
      return next(createError(400, "No restaurant exists with the provided email"));
    if (!(await restaurant.checkPassword(password, restaurant.password)))
      return next(createError(400, "Incorrect email or password"));
    const token = await genToken({ id: restaurant._id, role: restaurant.role });
    if (!token) return next(createError(400, "cannot generate the token"));
    return res.status(200).json({ tokrn: token, r: restaurant._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorname: error.name,
      message: error.message,
    });
  }
};
exports.updateLocationOfRestaurant = async (req, res, next) => {
  try {
    console.log('hit upload location of restaurant');
    const { latLng } = req.body;
    const updatedRestaurant = await restaurantSchema.findByIdAndUpdate(req.params.id, { $set: { location: { type: 'Point', coordinates: latLng } } }, { new: true });
    if (!updatedRestaurant) return next(createError(400, 'cannot add the location'));
    return res.status(200).json({ updatedRestaurant });
  } catch (error) {
    return res.status(500).json({ errorname: error.name, message: error.message })
  }
}
exports.restaurantById = async (req, res, next) => {
  try {
    const restaurant = await restaurantSchema.findById(req.params.id);
    return res.status(200).json({ restaurant });
  } catch (error) {
    return res.status(500).json({ errorname: error.name, message: error.message })
  }
}
exports.updateRestaurant = async (req, res, next) => {
  try {
    console.log('hit restaurant update profile (updateMeRestaurant)');
    const { name, email, address, tagline, contact, profile, restaurantMenu } = req.body;
    const updatedRestaurant = await restaurantSchema.findByIdAndUpdate(req.params.id, { $set: { name, email, address, contact, tagline, profile, restaurantMenu/* profile: profilePath, restaurantMenu: menuPath*/ } }, { new: true });
    if (!updatedRestaurant) return next(createError(400, 'cannot update the data of restaurant'));
    return res.status(200).json({ updatedRestaurant });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorname: error.name, message: error.message })
  }
}
exports.deleteByRestaurant = async (req, res, next) => {
  try {
    console.log('hit delete category by id');
    const { id } = req.params;
    const deletedCategory = await restaurantSchema.findOneAndDelete({ _id: id });
    if (!deletedCategory) return next(createError(400, 'cannot delete the category'));
    return res.status(200).json({ message: ' deletion successfull' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorname: error.name, message: error.message })
  }
}