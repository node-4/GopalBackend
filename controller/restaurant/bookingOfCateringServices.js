const bookingCateringService = require("../../model/bookingOfCateringServices");
const restaurant = require("../../model/restaurantCreate");
const user = require("../../model/userCreate");
const dishes = require("../../model/dishes");
const notifi = require("../../model/notification")
const moment = require("moment")


module.exports.getbookingCateringServicebyRestaurant = async(req,res)=>{
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
  
  exports.getbookingCateringServicebyidbyRestaurant = async (req, res) => {
    try {
      const bookingCateringServiceData = await bookingCateringService.find({restaurantId:req.params.restaurantId});
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


  exports.getbookingCateringServiceByUserIdbyRestaurant = async (req, res) => {
    try {
      const bookingCateringServiceData = await bookingCateringService.find({userId:req.params.userId});
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


  module.exports.bookOfCateringServicesByRestaurant = async (req, res) => {
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
  


module.exports.upadteCateringServiceOfRestaurant = async (req, res) => {
  try {

      const date = moment(req.body.Date).format("YYYY-MM-DD");

      const bookingO = {
          Date:date,
          dishId:req.body.dishId,
          userId:req.body.userId,
          restaurantId:req.body.restaurantId,
          amount: parseInt(req.body.amount),
          payment: req.body.payment,
          Status :req.body.Status
        };

        console.log(bookingO);
    const bookingdata = await bookingCateringService.findByIdAndUpdate({ _id: req.params.id },bookingO,{new:true});

    const noti = await notifi.create({receiverUser:bookingdata.userId,body:`your order is ${req.body.Status}`})
      console.log(noti)

    return res.status(200).send({bookingdata,noti})
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};



exports.deleteCateringervicesByIdRestaurant = async (req, res, next) => {
  try {
    console.log("hit by id");

    const { id } = req.params;

    const deletedData = await bookingCateringService.findOneAndDelete({
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
