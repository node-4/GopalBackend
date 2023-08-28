const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const objectid = mongoose.Schema.Types.ObjectId;

const subscriptionSchema = new mongoose.Schema(
  {
   
    Plantype: { 
        type: String,
        default:null,
       // enum:["null","daily","weekly","monthly"]
     },
     plan:{
        type:String,
        default:null,
        //enum:["breakfast","lunch","dinner","null"]
     },
     typeOfPlate:{
        type:String,
        default:null,
       // enum:["veg","nonveg","customizedplate","null"]
     }
  },
  {
    timestamps: true,
  }
);
module.exports = subscriptionSchema;
