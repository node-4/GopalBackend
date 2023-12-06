const Banner = require("../../model/Banner");

exports.createBanner = async (req, res, next) => {
  try {
    console.log("hit dish");
    const DishData = await Banner.findOne({ title: req.body.title, restaurantId: req.user });
    if (DishData) {
      return res.status(409).send({ status: 409, message: "Banner already exits" });
    }
    if (req.file) {
      req.body.image = req.file.path;
    }
    const newDish = await Banner.create({
      image: req.body.image,
      title: req.body.title,
      restaurantId: req.user,
    });
    if (!newDish) {
      return res.status(400).send({ status: 400, message: "cannot add the new Banner" });
    }
    return res.status(200).send({ status: 200, message: "Add the new Banner", data: newDish });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
  }
};
exports.getBannerOfRestaurant = async (req, res, next) => {
  try {
    const DishData = await Banner.find({ restaurantId: req.user });
    if (DishData.length === 0) {
      return res.status(400).send({ status: 400, message: "cannot get the Banner" });
    } else {
      return res.status(200).send({ status: 200, message: "get the Banner", data: DishData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
  }
};
exports.getBanner = async (req, res, next) => {
  try {
    const DishData = await Banner.find({});
    if (DishData.length === 0) {
      return res.status(400).send({ status: 400, message: "cannot get the Banner" });
    } else {
      return res.status(200).send({ status: 200, message: "get the Banner", data: DishData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorName: error.name, message: error.message, });
  }
};
exports.editBanner = async (req, res, next) => {
  try {
    console.log("hit Banner");
    const restaurant = await Banner.findById(req.params.id);
    if (!restaurant) {
      return res.status(400).send({ status: 400, msg: "Banner not found" });
    } else {
      const DishData = await Banner.findOne({ _id: { $ne: restaurant._id }, title: req.body.title, restaurantId: req.user });
      if (DishData) {
        return res.status(409).send({ status: 409, message: "Banner already exits" });
      }
      if (req.file) {
        req.body.image = req.file.path;
      } else {
        req.body.image = restaurant.image;
      }
      const data = {
        image: req.body.image || restaurant.image,
        title: req.body.title || restaurant.title,
        restaurantId: req.user || restaurant.restaurantId,
      };
      const updated = await Banner.findOneAndUpdate({ _id: restaurant._id }, { $set: data }, { new: true });
      if (!updated) {
        return res.status(400).send({ status: 400, message: "Cannot update the Banner" });
      }
      return res.status(200).send({ status: 200, message: "Update the Banner", data: updated });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
  }
};
exports.getBannerByID = async (req, res, next) => {
  try {
    const DishData = await Banner.findOne({ _id: req.params.id })
    if (!DishData) {
      return res.status(400).send({ status: 400, message: "cannot get the Banner" });
    } else {
      return res.status(200).send({ status: 200, message: "get the Banner", data: DishData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
  }
};
exports.deleteBanner = async (req, res) => {
  try {
    const Dishdata = await Banner.findOneAndDelete({ _id: req.params.id, });
    if (!Dishdata) {
      return res.status(400).json({ message: "Banner not found", });
    }
    return res.status(200).json({ message: "Banner deleted", data: Dishdata, });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "internal server error", });
  }
};
