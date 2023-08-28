const bookings = require("../../model/booking");
const restaurant = require("../../model/restaurantCreate");
const user = require("../../model/userCreate");
const notifi = require("../../model/notification")
const moment = require("moment")

module.exports.bookServiceOfRestaurant = async (req, res) => {
  try {
    const userData = await user.findById({ _id: req.body.userId });
    if (!userData || userData.length == 0)
      return res.status(400).send({ msg: "no user found" });

    console.log(userData._id);

    const restaurantData = await restaurant.findById({
      _id: req.body.restaurantId,
    });
    if (!restaurantData || restaurantData.length == 0)
      return res.status(400).send({ msg: "no restaurant found" });

      console.log(restaurantData._id);

      const date = moment(req.body.Date).format("YYYY-MM-DD");

    const bookingO = {
      Date:date,
      userId: userData._id,
     // userobject: userData,
      restaurantId:restaurantData._id,
     // restaurantobject:restaurantData,
      amount: parseInt(req.body.amount),
      payment: req.body.payment,
    };
    console.log(bookingO);

    const bookingData = await bookings.create(bookingO);
    return res.status(200).json(bookingData)
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.getbookingsbyRestaurant = async(req,res)=>{
  try {

     const bookingData = await bookings.find()
     console.log(bookingData)
      if(!bookingData || bookingData.length==0 ){
          return res.status(400).json({msg:"No bookingData added"})
      }else{
          return res.status(200).json(bookingData)
      }
  } catch (error) {
      return res.status(400).json({msg:error.message, name:error.name})
  }
}

exports.getbookingbyidbyRestaurant = async (req, res) => {
  try {
    const booking = await bookings.find({userId:req.params.id});
    if (!booking) {
      return res.status(400).json({
        message: "booking not found",
      });
    }
    return res.status(200).json({
      message: "booking found",
      data: booking,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};




module.exports.upadtebookServiceOfRestaurant = async (req, res) => {
    try {

        const date = moment(req.body.Date).format("YYYY-MM-DD");

        const bookingO = {
            Date:date,
            userId:req.body.userId,
            restaurantId:req.body.restaurantId,
            amount: parseInt(req.body.amount),
            payment: req.body.payment,
            Status: req.body.Status
          };

     // console.log(bookingO);
      const bookingdata = await bookings.findByIdAndUpdate({ _id: req.params.id },bookingO,{new:true});

      console.log(bookingdata)
      const noti = await notifi.create({receiverUser:bookingdata.userId,body:`your order is ${req.body.Status}`})
      console.log(noti)
     
      return res.status(200).send({bookingdata,noti})
    } catch (error) {
      return res.status(400).json({ msg: error.message, name: error.name });
    }
  };


  
exports.deleteBookingByIdRestaurant = async (req, res, next) => {
    try {
      console.log("hit CancellationPolicy  by id");
  
      const { id } = req.params;
  
      const deletedData = await bookings.findOneAndDelete({
       // restaurantId: req.user,
        _id: id,
      });
  
      if (!deletedData)
        return next(CreateError(400, "cannot delete the policy"));
  
      return res.status(200).json({ message: "deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errorName: error.name,
        message: error.message,
      });
    }
  };
  