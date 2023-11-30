const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    typeOfMeal: {type:String}
});

module.exports = mongoose.model('Meal', mealSchema);
