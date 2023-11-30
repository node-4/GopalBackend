const createError = require("http-errors");

const Dish = require("../../model/dishes");
const mongoose = require("mongoose");


exports.getDishByUser = async (req, res, next) => {
    try {
      console.log("hit restaurant get Dish");
  
      // const banner = await Banner.findOne({});
      const DishData = await  Dish.find();
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
  

  
exports.getDishByIdByUser = async (req, res, next) => {
    try {
      console.log("hit restaurant get Dish");
  
      // const banner = await Banner.findOne({});
      const DishData = await  Dish.find({_id: req.params.id});
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

  
exports.searchDishByUserAccToNumRating = async (req, res, next) => {
    try {
      console.log("hit restaurant get Dish");
  
      // const banner = await Banner.findOne({});
      const DishData = await  Dish.find({dishName:req.params.dishName});
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
  