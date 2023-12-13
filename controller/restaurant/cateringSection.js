const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const cateringDish = require("../../model/catering/cateringDishes");
const cateringService = require("../../model/catering/cateringService");
const cateringQuery = require("../../model/catering/cateringQuery");
const jwt = require("jsonwebtoken");

exports.createDish = async (req, res, next) => {
  try {
    console.log("hit cateringDish");
    const dishData = await cateringDish.findOne({
      name: req.body.name,
      option: req.body.option,
      dishIsOfRestaurant: req.user,
    });
    if (dishData) {
      return res
        .status(409)
        .send({ status: 409, message: "Dish already exits" });
    }
    if (req.file) {
      req.body.image = req.file.path;
    }
    const newDish = await cateringDish.create({
      image: req.body.image,
      name: req.body.name,
      description: req.body.description,
      dishIsOfRestaurant: req.user,
      option: req.body.option,
    });
    if (!newDish) {
      return res
        .status(400)
        .send({ status: 400, message: "cannot add the new Dish" });
    }
    return res
      .status(200)
      .send({ status: 200, message: "add the new Dish", data: newDish });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, errorName: error.name, message: error.message });
  }
};
exports.getDish = async (req, res, next) => {
  try {
    console.log("hit cateringDish");
    const dishData = await cateringDish.find({ dishIsOfRestaurant: req.user });
    if (dishData.length === 0) {
      return res
        .status(400)
        .send({ status: 400, message: "cannot get the Dish" });
    } else {
      return res
        .status(200)
        .send({ status: 200, message: "get the Dish", data: dishData });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, errorName: error.name, message: error.message });
  }
};
exports.getDishByIdOfRestaurant = async (req, res, next) => {
  try {
    console.log("hit cateringDish");
    const dishData = await cateringDish.find({ dishIsOfRestaurant: req.params.id }).populate("dishIsOfRestaurant");
    if (dishData.length === 0) {
      return res.status(400).send({ status: 400, message: "cannot get the Dish" });
    } else {
      return res.status(200).send({ status: 200, message: "get the Dish", data: dishData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorName: error.name, message: error.message });
  }
};
exports.getDishesByName = async (req, res, next) => {
  try {
    console.log("hit cateringDish");
    const dish = req.params.name;
    const dishData = await cateringDish
      .find({ name: dish })
      .populate("dishIsOfRestaurant");
    if (dishData.length === 0) {
      return res
        .status(400)
        .send({ status: 400, message: "cannot get the Dish" });
    } else {
      return res
        .status(200)
        .send({ status: 200, message: "get the Dish", data: dishData });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errorName: error.name, message: error.message });
  }
};
exports.editDish = async (req, res, next) => {
  try {
    console.log("hit cateringDish");
    const restaurant = await cateringDish.findById(req.params.id);
    if (!restaurant) {
      return res.status(400).send({ status: 400, msg: "Dish not found" });
    } else {
      const dishData = await cateringDish.findOne({
        _id: { $ne: restaurant._id },
        name: req.body.name,
        option: req.body.option,
        dishIsOfRestaurant: req.user,
      });
      if (dishData) {
        return res
          .status(409)
          .send({ status: 409, message: "Dish already exits" });
      }
      if (req.file) {
        req.body.image = req.file.path;
      } else {
        req.body.image = restaurant.image;
      }
      const data = {
        image: req.body.image || restaurant.image,
        name: req.body.name || restaurant.name,
        description: req.body.description || restaurant.description,
        dishIsOfRestaurant: req.user || restaurant.dishIsOfRestaurant,
        option: req.body.option || restaurant.option,
      };
      const updated = await cateringDish.findOneAndUpdate(
        { _id: restaurant._id },
        { $set: data },
        { new: true }
      );
      if (!updated) {
        return res
          .status(400)
          .send({ status: 400, message: "Cannot update the Dish" });
      }
      return res
        .status(200)
        .send({ status: 200, message: "Update the Dish", data: updated });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, errorName: error.name, message: error.message });
  }
};
exports.getDishByID = async (req, res, next) => {
  try {
    console.log("hit cateringDish");
    const dishData = await cateringDish
      .findOne({ _id: req.params.id })
      .populate("dishIsOfRestaurant");
    if (!dishData) {
      return res
        .status(400)
        .send({ status: 400, message: "cannot get the Dish" });
    } else {
      return res
        .status(200)
        .send({ status: 200, message: "get the Dish", data: dishData });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, errorName: error.name, message: error.message });
  }
};
exports.deleteDish = async (req, res) => {
  try {
    console.log("hit cateringDish");
    const dishData = await cateringDish.findOneAndDelete({
      _id: req.params.id,
    });
    if (!dishData) {
      return res.status(400).json({ message: "dishData not found" });
    }
    return res
      .status(200)
      .json({ message: "dishData deleted", data: dishData });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "internal server error" });
  }
};
exports.createCateringService = async (req, res, next) => {
  try {
    const { platesName, items, option } = req.body;
    let itemsArray = [];
    for (let i = 0; i < items.length; i++) {
      const dishData = await cateringDish.findOne({ _id: items[i], dishIsOfRestaurant: req.user });
      if (dishData) {
        itemsArray.push(items[i]);
      }
    }
    const newCateringService = await cateringService.create({
      platesName,
      dishIsOfRestaurant: req.user,
      items: itemsArray,
      option,
    });

    return res.status(200).json({ status: 200, message: "Catering service created", data: newCateringService });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, errorName: error.name, message: error.message });
  }
};
exports.getAllCateringServices = async (req, res, next) => {
  try {
    const cateringServices = await cateringService.find({ dishIsOfRestaurant: req.user });
    if (cateringServices.length == 0) {
      return res.status(404).json({ status: 404, message: "Catering services not found.", data: {} });
    }
    return res.status(200).json({ status: 200, message: "Get all catering services", data: cateringServices });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, errorName: error.name, message: error.message });
  }
};
exports.getCateringServicesByIdOfRestaurant = async (req, res, next) => {
  try {
    console.log("hit cateringService");
    const dishData = await cateringService.find({ dishIsOfRestaurant: req.params.id }).populate('items')
    if (dishData.length === 0) {
      return res.status(400).send({ status: 400, message: "cannot get the Catering services" });
    } else {
      return res.status(200).send({ status: 200, message: "get the Catering services", data: dishData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorName: error.name, message: error.message });
  }
};
exports.getCateringServiceById = async (req, res, next) => {
  try {
    const findCateringService = await cateringService.findById(req.params.id).populate('items dishIsOfRestaurant');
    if (!findCateringService) {
      return res.status(404).json({ status: 404, message: "Catering service not found" });
    }
    return res.status(200).json({ status: 200, message: "Get catering service by ID", data: findCateringService });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, errorName: error.name, message: error.message });
  }
};
exports.updateCateringService = async (req, res, next) => {
  try {
    const { platesName, items, option } = req.body;
    const existingCateringService = await cateringService.findOne({ _id: req.params.id, dishIsOfRestaurant: req.user, });
    if (!existingCateringService) {
      return res.status(404).json({ status: 404, message: "Catering service not found" });
    }
    let itemsArray = [];
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const dishData = await cateringDish.findOne({ _id: items[i], dishIsOfRestaurant: req.user });
        if (dishData) {
          itemsArray.push(items[i]);
        }
      }
    } else {
      itemsArray = existingCateringService.items;
    }
    existingCateringService.platesName = platesName || existingCateringService.platesName;
    existingCateringService.items = itemsArray;
    existingCateringService.option = option || existingCateringService.option;
    await existingCateringService.save();

    return res.status(200).json({ status: 200, message: "Catering service updated", data: existingCateringService });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, errorName: error.name, message: error.message });
  }
};
exports.deleteCateringService = async (req, res, next) => {
  try {
    const deletedCateringService = await cateringService.findByIdAndDelete(req.params.id);
    if (!deletedCateringService) {
      return res.status(404).json({ status: 404, message: "Catering service not found" });
    }
    return res.status(200).json({ status: 200, message: "Catering service deleted", data: deletedCateringService });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, errorName: error.name, message: error.message });
  }
};
exports.getCateringQuery = async (req, res, next) => {
  try {
    const orders = await cateringQuery.find({ dishIsOfRestaurant: req.user }).populate('user items dishIsOfRestaurant cateringServiceId')
    if (orders.length == 0) {
      return res.status(404).json({ status: 404, message: "Catering query not found", data: {} });
    }
    return res.status(200).json({ status: 200, msg: "Catering query of user", data: orders })
  } catch (error) {
    console.log(error);
    return res.status(501).send({ status: 501, message: "server error.", data: {}, });
  }
};