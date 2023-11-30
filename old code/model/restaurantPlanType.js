const mongoose = require('mongoose');

const planTypeSchema = new mongoose.Schema({
    Plantype: {type:String},
    subtype:{type:String},
    mealPlate:{type:String}
});

module.exports = mongoose.model('PlanType', planTypeSchema);
