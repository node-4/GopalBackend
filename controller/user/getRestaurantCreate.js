const createError = require('http-errors');
const user = require('../../model/restaurantCreate');
const mongoose = require('mongoose');


exports.getRestaurantByUser = async (req, res, next) => {
    try {
        console.log('hit user get restaurant');
console.log(req.params.typeOfMeal.toString())
         const userData = await user.find({typeOfMeal:req.params.typeOfMeal.toString()});
        if (!userData) return next(createError(400, 'cannot get the restaurant'));

        return res.status(200).json(userData);

    } catch (error) { 
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}




exports.getAllRestaurantByUser = async (req, res, next) => {
    try {
        console.log('hit user get restaurant');
// console.log(req.params.typeOfMeal.toString())
         const userData = await user.find()
        if (!userData) return next(createError(400, 'cannot get the restaurant'));

        return res.status(200).json(userData);

    } catch (error) { 
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}



exports.getAllRestaurantBytypeOfMealPlanType = async (req, res, next) => {
    try {
        console.log('hit user get restaurant');
// console.log(req.params.typeOfMeal.toString())
         const userData = await user.find({
            typeOfMeal:req.params.typeOfMeal,Plantype:req.params.Plantype
         })
        if (!userData) return next(createError(400, 'cannot get the restaurant'));

        return res.status(200).json(userData);

    } catch (error) { 
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


// const restaurantSchema = new mongoose.Schema({
//   name: String,
//   ratings: [
//     {
//       customer: String,
//       rating: Number
//     }
//   ]
// });

// const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// app.post('/restaurant/:name/rate', (req, res) => {
//   const { name } = req.params;
//   const { customer, rating } = req.body;

//   Restaurant.findOneAndUpdate(
//     { name },
//     { $push: { ratings: { customer, rating } } },
//     { new: true }
//   ).then((restaurant) => {
//     res.json(restaurant);
//   }).catch((err) => {
//     console.log(err);
//     res.status(500).send("Error rating restaurant");
//   });
// });

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });