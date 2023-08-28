const mongoose = require('mongoose');
const locationSchema = require('./locationModel');

const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
       // required: true,
        trim: true,
        unique: true
        /// a string containing mobile number the country code will be pepended to it automatically default (+91) refer to (/middlewares/twilioSms.js)
    },
    name: {
        type: String,
        trim: true,
        default: '',
        lowercase: true
    },
    address: {
        type: String,
        trim: true,
        default: '',
        lowercase: true
    },
    pincode: {
        type: String,
        trim: true,
        default: ''
    },
    profileImage:{
        type: String,
         default:"https://www.youtube.com/results?search_query=dubay+pathway+",
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user']
    },
    currentLocation:{
        type: locationSchema
    },
    google_id:{type: String},
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
