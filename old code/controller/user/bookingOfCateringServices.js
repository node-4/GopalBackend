const bookingCateringService = require("../../model/bookingOfCateringServices");
const restaurant = require("../../model/restaurantCreate");
const user = require("../../model/userCreate");
const dishes = require("../../model/dishes");
const moment = require("moment")


module.exports.bookOfCateringServices = async (req, res) => {
  try {
    const DishesData = await dishes.findById({
      _id: req.body.dishId,
    });
    if (!DishesData || DishesData.length == 0)
      return res.status(400).send({ msg: "no dishes found" });

    console.log(DishesData._id);
    console.log(DishesData.dishIsOfRestaurant);

    const restaurantData = await restaurant.findById({
      _id: DishesData.dishIsOfRestaurant,
    });
    if (!restaurantData || restaurantData.length == 0)
      return res.status(400).send({ msg: "no restaurant found" });

    console.log(restaurantData);

    const userData = await user.findById({ _id: req.body.userId });
    if (!userData || userData.length == 0)
      return res.status(400).send({ msg: "no user found" });

    console.log(userData._id);

    const date = moment(req.body.Date).format("YYYY-MM-DD");

    const bookingO = {
      Date:date,
      dishId: DishesData._id,
     // dishobject: DishesData,
      userId: userData._id,
     // userobject: userData,
      restaurantId: DishesData.dishIsOfRestaurant,
     // restaurantobject: restaurantData,
      amount: parseInt(req.body.amount),
      payment: req.body.payment,
    };

    console.log(bookingO);

    const bookingData = await bookingCateringService.create(bookingO);
    return res.status(200).json(bookingData);
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

module.exports.getbookingCateringServicebycustomer = async(req,res)=>{
  try {

     const bookingData = await bookingCateringService.find()
     console.log(bookingData)
      if(!bookingData || bookingData.length==0 ){
          return res.status(400).json({msg:"No bookingCateringService added"})
      }else{
          return res.status(200).json(bookingData)
      }
  } catch (error) {
      return res.status(400).json({msg:error.message, name:error.name})
  }
}

exports.getbookingCateringServicebyidbycustomer = async (req, res) => {
  try {
    const bookingCateringServiceData = await bookingCateringService.find({userId:req.params.id});
    if (!bookingCateringServiceData) {
      return res.status(400).json({
        message: "bookingCateringService not found",
      });
    }
    return res.status(200).json({
      message: "bookingCateringService found",
      data: bookingCateringServiceData,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
