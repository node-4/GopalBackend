const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    restaurantId:{
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
      //  required: true
    },
    restaurantName:{
        type:String
    },
    restaurantEmail:{
        type:String
    },
    restaurantcontact:{
        type:String
    },
    discountPercent : {
        type: Number,
        required: true,
        min: 0,
        max: 80
    },
    coupencode:{
        type:Number
    },
    },{
    timestamps: true
})

module.exports = mongoose.model('Coupon',couponSchema);
