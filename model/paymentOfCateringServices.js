const mongoose = require('mongoose');
const objectid = mongoose.Schema.Types.ObjectId

const paymentOfCateringSchema = mongoose.Schema({
    payment_Id :{
        type: String, 
    }, 
    amount: {
        type: Number, 
       // required: true
    }, 
    invoice: {
        type: String
    },
    status: {
        type: Boolean, 
        default : false
    }, 
    receipt: {
        type: String, 
       // required: true
    }, 
    amount_paid: {
        type: Number,
        default: 0
    },
    name: {
        type: String, 
       // required: true
    }, 
    type: {
        type: String, 
        enum : ["given", "Given", "taken", "Taken", "GIVEN", "TAKEN"]
    }, 
    date: {
        type: Date,default:Date.now()
    }, 
    paymentMethod : {
        type: String, 
        enum: ["upi", "DebitCard", "Debitcard", "debitcard", "creditcard", "CreditCard"]
    }, 
    product: {
        type: String
    }, 
    orderStatus : {
        type: String, 
        default: "In Progress",
        enum: ["Cancelled", "In Progress", "Ordered"]
    },
    user:{type:String},
    userObject:{type:Object},
    restaurantId:{type:String},
    restaurantObject:{type:Object},
    bookingId:{type:objectid},
    orderId :{type:String},

})

const paymentOfCatering = mongoose.model('paymentOfCatering', paymentOfCateringSchema);

module.exports = paymentOfCatering;