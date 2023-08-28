const createError = require("http-errors");

const Dish = require("../../model/dishes");
const mongoose = require("mongoose");

exports.createDish = async (req, res, next) => {
  try {
    console.log("hit dish");

    //  if ( req.files.banner.length === 0) return next(createError(400, 'please provide the banner images'));

    // if (await Banner.findOne({})) return next(createError(400, 'a banner already exists please update the existing one'));

    // const pathArray = req.files.banner.map((item) => {
    //     return `${item.destination}/${item.filename}`
    // })

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

    if (!newDish) return next(createError(400, "cannot add the new Dish"));
    return res.status(200).json(newDish);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

exports.editDish = async (req, res, next) => {
  try {
    console.log("hit restaurant edit the Dish");

    //  if ( req.files.banner.length === 0 ) return next(createError(400, 'please provide the banner images'));

    // const pathArray = req.files.banner.map((item) => {
    //     return `${item.destination}/${item.filename}`
    // })
    const data = {
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
    };

    const updated = await Dish.findOneAndUpdate({}, data, { new: true });

    if (!updated) return next(createError(400, "cannot update the Dish "));

    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

exports.getDish = async (req, res, next) => {
  try {
    console.log("hit restaurant get Dish");

    // const banner = await Banner.findOne({});
    const DishData = await Dish.find();
    if (!DishData) return next(createError(400, "cannot get the Dish"));

    return res.status(200).json(DishData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

exports.getdishesByName = async (req, res, next) => {
  try {
    console.log("hit restaurant get Dish");
    const dish = req.params.dishName;
    console.log(dish);
    // const banner = await Banner.findOne({});
    const DishData = await Dish.find({dishName:dish}).populate(
      'dishIsOfRestaurant'
    );
    console.log(DishData);
    // const dishes = await Dish.find({ dishName: { $regex: dishName, $options: "i" } })
    // .populate("dishIsOfRestaurant", "restaurantName address");
    if (!DishData) return next(createError(400, "cannot get the Dish"));

    return res.status(200).json(DishData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

exports.getDishByIdOfRestaurant = async (req, res, next) => {
  try {
    console.log("hit restaurant get Dish");

    // const banner = await Banner.findOne({});
    const DishData = await Dish.find({ dishIsOfRestaurant: req.params.id }).populate('dishIsOfRestaurant');
    if (!DishData) return next(createError(400, "cannot get the Dish"));

    return res.status(200).json(DishData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};
