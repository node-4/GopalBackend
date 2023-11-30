const Dish = require("../../model/restaurant/dishes");

exports.createDishByAdmin = async (req, res, next) => {
  try {
    console.log("hit dish");
    const DishData = await Dish.findOne({ dishName: req.body.dishName, dishIsOfRestaurant: req.body.dishIsOfRestaurant });
    if (DishData) {
      return res.status(409).send({ status: 409, message: "Dish already exits" });
    }
    if (req.file) {
      req.body.foodImg = req.file.path;
    }
    const newDish = await Dish.create({
      foodImg: req.body.foodImg,
      dishName: req.body.dishName,
      description: req.body.description,
      priceForSmallPortion: req.body.priceForSmallPortion,
      priceForMediumPortion: req.body.priceForMediumPortion,
      priceForLargePortion: req.body.priceForLargePortion,
      dishIsOfRestaurant: req.body.dishIsOfRestaurant,
      currency: req.body.currency,
      numLikes: req.body.numLikes,
      option: req.body.option,
    });
    if (!newDish) {
      return res.status(400).send({ status: 400, message: "cannot add the new Dish" });
    }
    return res.status(200).send({ status: 200, message: "add the new Dish", data: newDish });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
  }
};
exports.getDishByAdmin = async (req, res, next) => {
  try {
    const DishData = await Dish.find({});
    if (DishData.length === 0) {
      return res.status(400).send({ status: 400, message: "cannot get the Dish" });
    } else {
      return res.status(200).send({ status: 200, message: "get the Dish", data: DishData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
  }
};
exports.getDishByIdOfRestaurantByAdmin = async (req, res, next) => {
  try {
    console.log("hit restaurant get Dish");
    const DishData = await Dish.find({ dishIsOfRestaurant: req.params.id }).populate('dishIsOfRestaurant');
    if (DishData.length === 0) {
      return res.status(400).send({ status: 400, message: "cannot get the Dish" });
    } else {
      return res.status(200).send({ status: 200, message: "get the Dish", data: DishData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorName: error.name, message: error.message, });
  }
};
exports.searchDishByUserAccToNumRatingByAdmin = async (req, res, next) => {
  try {
    console.log("hit restaurant get Dish");
    const dish = req.params.dishName;
    const DishData = await Dish.find({ dishName: dish }).populate('dishIsOfRestaurant');
    if (DishData.length === 0) {
      return res.status(400).send({ status: 400, message: "cannot get the Dish" });
    } else {
      return res.status(200).send({ status: 200, message: "get the Dish", data: DishData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorName: error.name, message: error.message, });
  }
};
exports.editDishByAdmin = async (req, res, next) => {
  try {
    console.log("hit dish");
    const restaurant = await Dish.findById(req.params.id);
    if (!restaurant) {
      return res.status(400).send({ status: 400, msg: "Dish not found" });
    } else {
      const DishData = await Dish.findOne({ _id: { $ne: restaurant._id }, dishName: req.body.dishName, dishIsOfRestaurant: req.body.dishIsOfRestaurant });
      if (DishData) {
        return res.status(409).send({ status: 409, message: "Dish already exits" });
      }
      if (req.file) {
        req.body.foodImg = req.file.path;
      } else {
        req.body.foodImg = restaurant.foodImg;
      }
      const data = {
        foodImg: req.body.foodImg || restaurant.foodImg,
        dishName: req.body.dishName || restaurant.dishName,
        description: req.body.description || restaurant.description,
        priceForSmallPortion: req.body.priceForSmallPortion || restaurant.priceForSmallPortion,
        priceForMediumPortion: req.body.priceForMediumPortion || restaurant.priceForMediumPortion,
        priceForLargePortion: req.body.priceForLargePortion || restaurant.priceForLargePortion,
        dishIsOfRestaurant: req.body.dishIsOfRestaurant || restaurant.dishIsOfRestaurant,
        currency: req.body.currency || restaurant.currency,
        numLikes: req.body.numLikes || restaurant.numLikes,
        option: req.body.option || restaurant.option,
      };
      const updated = await Dish.findOneAndUpdate({ _id: restaurant._id }, { $set: data }, { new: true });
      if (!updated) {
        return res.status(400).send({ status: 400, message: "Cannot update the Dish" });
      }
      return res.status(200).send({ status: 200, message: "Update the Dish", data: updated });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
  }
};
exports.getDishByIdByAdmin = async (req, res, next) => {
  try {
    const DishData = await Dish.findOne({ _id: req.params.id }).populate('dishIsOfRestaurant');
    if (!DishData) {
      return res.status(400).send({ status: 400, message: "cannot get the Dish" });
    } else {
      return res.status(200).send({ status: 200, message: "get the Dish", data: DishData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
  }
};
exports.deleteDishesByAdmin = async (req, res) => {
  try {
    const Dishdata = await Dish.findOneAndDelete({ _id: req.params.id, });
    if (!Dishdata) {
      return res.status(400).json({ message: "Dishdata not found", });
    }
    return res.status(200).json({ message: "Dishdata deleted", data: Dishdata, });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "internal server error", });
  }
};