const bookings = require("../../model/booking");
const restaurant = require("../../model/restaurantCreate");
const user = require("../../model/userCreate");
const moment = require("moment")

module.exports.bookService = async (req, res) => {
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

module.exports.getbookingsbycustomer = async(req,res)=>{
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

// exports.getbookingbyidbycustomer = async (req, res) => {
//   try {
//     const booking = await bookings.find({userId:req.params.id});
//     if (!booking) {
//       return res.status(400).json({
//         message: "booking not found",
//       });
//     }
//     return res.status(200).json({
//       message: "booking found",
//       data: booking,
//     });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json({
//       message: "internal server error",
//     });
//   }
// };
