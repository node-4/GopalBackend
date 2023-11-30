const createError = require('http-errors');

const Meal = require('../../model/restaurantMeal');
const mongoose = require('mongoose');


exports.createMeal = async (req, res, next) => {
    try {
        console.log('hit restaurant');
 
      //  if ( req.files.banner.length === 0) return next(createError(400, 'please provide the banner images'));
       
       // if (await Banner.findOne({})) return next(createError(400, 'a banner already exists please update the existing one'));

        // const pathArray = req.files.banner.map((item) => {
        //     return `${item.destination}/${item.filename}`
        // })
      
        const newMeal = await Meal.create({
            typeOfMeal: /*pathArray*/req.body.typeOfMeal
        });

        if (!newMeal) return next(createError(400, 'cannot add the new Meal'));

        return res.status(200).json(newMeal);


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.editMeal = async (req, res, next) => {
    try {
        console.log('hit restaurant edit the Meal');

      //  if ( req.files.banner.length === 0 ) return next(createError(400, 'please provide the banner images'));

        // const pathArray = req.files.banner.map((item) => {
        //     return `${item.destination}/${item.filename}`
        // })
      
        const updated = await Meal.findOneAndUpdate({}, {
            typeOfMeal: /*pathArray*/req.body.typeOfMeal
        }, { new: true });

        if (!updated) return next(createError(400, 'cannot update the Meal'));

        return res.status(200).json(updated);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getMeal = async (req, res, next) => {
    try {
        console.log('hit restaurant get Meal');

       // const banner = await Banner.findOne({});
       const mealData = await Meal.find();
        if (!mealData) return next(createError(400, 'cannot get the Meal'));

        return res.status(200).json(mealData);

    } catch (error) { 
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}
