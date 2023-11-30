const createError = require("http-errors");
const Dish = require("../../model/dishes");
const mongoose = require("mongoose");


exports.createDishByAdmin = async (req, res, next) => {
  try {
    console.log("hit dish")

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

exports.editDishByAdmin = async (req, res, next) => {
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
    };

    const updated = await Dish.findOneAndUpdate({},  data, { new: true }  );
     
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



exports.editDishByIdByAdmin = async (req, res, next) => {
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
    };

    const updated = await Dish.findOneAndUpdate( {_id:req.params.id},  data, { new: true }  );
     
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



exports.getDishByIdOfRestaurantByAdmin = async (req, res, next) => {
  try {
    console.log("hit restaurant get Dish");

    // const banner = await Banner.findOne({});
    const DishData = await  Dish.find({dishIsOfRestaurant:req.params.id}).populate('dishIsOfRestaurant');
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






exports.getDishByAdmin = async (req, res, next) => {
    try {
      console.log("hit restaurant get Dish");
  
      // const banner = await Banner.findOne({});
      const DishData = await  Dish.find().populate('dishIsOfRestaurant');
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
  

  
exports.getDishByIdByAdmin = async (req, res, next) => {
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


  exports.deleteDishesByAdmin = async (req, res) => {
    try {
      const Dishdata = await Dish.findOneAndDelete({
        _id: req.params.id,
      });
      if (!Dishdata) {
        return res.status(400).json({
          message: "Dishdata not found",
        });
      }
      return res.status(200).json({
        message: "Dishdata deleted",
        data: Dishdata,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        message: "internal server error",
      });
    }
  };


   
exports.searchDishByUserAccToNumRatingByAdmin = async (req, res, next) => {
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