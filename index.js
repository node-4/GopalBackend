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


////////////////////////////////////////////////////////////////////////////// new Routes///////////////////////////////////////////////////////////////////////////////////////////
// admin routes use
require('./routeNew/admin/adminCreate')(app);
require('./routeNew/admin/restaurantCreate')(app);
require('./routeNew/admin/cancellationPolicy')(app);
require('./routeNew/admin/privacy')(app);
require('./routeNew/admin/aboutus')(app);
require('./routeNew/admin/dishes')(app);


// restaurant routes use
require('./routeNew/restaurant/restaurantCreate')(app);
require('./routeNew/restaurant/dishes')(app);
require('./routeNew/restaurant/cancellationPolicy')(app);
require('./routeNew/restaurant/Kitchen')(app);




















////////////////////////////////////////////////////////////////////////////// old Routes///////////////////////////////////////////////////////////////////////////////////////////
require('./route/user/user.create')(app);
require('./route/user/getRestaurantCreate')(app);
require('./route/user/booking')(app);
require('./route/user/payment')(app);
require('./route/user/coupen')(app);
require('./route/user/cancellationPolicy')(app);
require('./route/user/bookingOfCateringServices')(app);
require('./route/user/paymentOfCateringServices')(app);
require('./route/user/notification')(app);
require('./route/user/review')(app);

/// admin routes use
require('./route/admin/adminCreate')(app);
require('./route/admin/payment')(app);
require('./route/admin/coupen')(app);
// require('./route/admin/cancellationPolicy')(app);
require('./route/admin/booking')(app);
require('./route/admin/bookingOfCateringServices')(app);
require('./route/admin/paymentOfCateringServices')(app);
require('./route/admin/notification')(app);
require('./route/admin/restaurantCreate')(app);
require('./route/admin/userCreate')(app);
require('./route/admin/privacy')(app);
require('./route/admin/aboutus')(app);
require('./route/admin/userCreate')(app);

// /// restaurant routes use

require('./route/restaurant/restaurantCreate')(app);
require('./route/restaurant/restaurantBanner')(app);
require('./route/restaurant/restaurantPlanType')(app);
require('./route/restaurant/restaurantMeal')(app);
require('./route/restaurant/dishes')(app);
require('./route/restaurant/payment')(app);
require('./route/restaurant/coupen')(app);
require('./route/restaurant/cancellationPolicy')(app);
require('./route/restaurant/bookingOfCateringServices')(app);
require('./route/restaurant/paymentOfCateringServices')(app);
require('./route/restaurant/notification')(app);
// app.use('/api',reviewRestaurantRoute)
require('./route/restaurant/booking')(app);




app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = {
  handler: serverless(app),
};


// const app = require('./app');

