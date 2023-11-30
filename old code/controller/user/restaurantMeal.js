const Meal = require('../../model/restaurantMeal');
const mongoose = require('mongoose');


exports.getMealByUser = async (req, res, next) => {
    try {
        console.log('hit user get Meal');

       // const banner = await Banner.findOne({});
       const Mealdata = await Meal.find();
        if (!Mealdata) return next(createError(400, 'cannot get the Meal'));

        return res.status(200).json(Mealdata);

    } catch (error) { 
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

