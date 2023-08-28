const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const locationSchema = require("./locationModel");
const subscriptionSchema = require("./subscription");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //  required: true
    },
    email: {
      type: String,
    //  required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
     // select: false,
    },
    address: {
      type: String,
      // required: true
    },
    profile: {
      type: String,
      default: "https://www.youtube.com/results?search_query=dubay+pathway+",
//required: true
    },
    tagline: {
      type: String,
     //  required: true
    },
    contact: {
      type: String,
     // required: true
    },
    restaurantMenu: {
      type: String,
      default: "https://www.youtube.com/results?search_query=dubay+pathway+",
      // required: true
    },
    role: {
      type: String,
      //default: 'restaurant',
      // enum: ['restaurant','Home Carriage Subscription','Catering Services']
    },
    numRatings: {
      type: Number,
      default: 0,
    },
    avgStarRating: {
      type: Number,
      default: 0,
    },
    location: {
      type: locationSchema,
    },
    subscription: {
      type: subscriptionSchema,
    },
    option:{
        type:String,
      //  enum:["veg","nonveg"]
    },
   // typeOfMeal: { type: String },
  
  },
  {
    timestamps: true,
  }
);

restaurantSchema.methods.checkPassword = async function (
  passwordText,
  passwordHash
) {
  return bcrypt.compare(passwordText, passwordHash);
};

restaurantSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } else {
    next();
  }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
