const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//const multer = require("multer");
const app = express();
const bodyparser = require("body-parser");

const serverless = require("serverless-http");


const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Db conneted succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Working App" });
});




/// user routes use
app.use('/api', require('./route/user/user.create'));
app.use('/api', require('./route/user/getRestaurantCreate'))
app.use('/api', require('./route/user/booking'))
app.use('/api', require('./route/user/payment'))
app.use('/api', require('./route/user/coupen'))
app.use('/api', require('./route/user/cancellationPolicy'))
app.use('/api', require('./route/user/bookingOfCateringServices'))
app.use('/api', require('./route/user/paymentOfCateringServices'))
app.use('/api', require('./route/user/notification'))
app.use('/api', require('./route/user/review'))



/// admin routes use
app.use('/api', require('./route/admin/adminCreate'));
app.use('/api', require('./route/admin/payment'))
app.use('/api', require('./route/admin/coupen'))
app.use('/api', require('./route/admin/cancellationPolicy'))
app.use('/api', require('./route/admin/booking'))
app.use('/api', require('./route/admin/bookingOfCateringServices'))
app.use('/api', require('./route/admin/paymentOfCateringServices'))
app.use('/api', require('./route/admin/notification'))
app.use('/api', require("./route/admin/restaurantCreate"))
app.use('/api', require("./route/admin/userCreate"))
app.use('/api', require('./route/admin/deliveryAgents'))
app.use('/api', require('./route/admin/privacy'))
app.use('/api', require('./route/admin/aboutus'))
//app.use('/api',subscription)
//app.use('/api',reviewAdminRoute)
//app.use('/api',bookingAdminRoutes)


// /// restaurant routes use
app.use('/api', require('./route/restaurant/restaurantCreate'));
app.use('/api', require('./route/restaurant/restaurantBanner'))
app.use('/api', require('./route/restaurant/restaurantPlanType'))
app.use('/api', require('./route/restaurant/restaurantMeal'))
app.use('/api', require('./route/restaurant/dishes'))
app.use('/api', require('./route/restaurant/payment'))
app.use('/api', require('./route/restaurant/coupen'))
app.use('/api', require('./route/restaurant/cancellationPolicy'))
app.use('/api', require('./route/restaurant/bookingOfCateringServices'))
app.use('/api', require('./route/restaurant/paymentOfCateringServices'))
app.use('/api', require('./route/restaurant/notification'))
//app.use('/api',reviewRestaurantRoute)
app.use('/api', require('./route/restaurant/booking'))




app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = {
  handler: serverless(app),
};


// const app = require('./app');

