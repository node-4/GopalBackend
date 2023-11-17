const path = require('path');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res, next) => {
    return res.status(200).json({
        message: "Welcome to api portal"
    })
})

/*
   Require Routes
*/

/// webhook end point
// const webhookRoute = require('./routes/payments/razorpayWebhook.routes');
// app.use('/api', webhookRoute);

//// user routes require
 const userCreateRoutes = require('./route/user/user.create');
 const getRestaurantByUser = require('./route/user/getRestaurantCreate')
 const bookingRoutes = require('./route/user/booking')
 const paymentRoute = require('./route/user/payment')
 const coupenRoute = require('./route/user/coupen')
 const cancellationPolicyRoute = require('./route/user/cancellationPolicy')
 const bookingCateringServicesRoute = require('./route/user/bookingOfCateringServices')
 const paymentOfCateringServiceRoute = require('./route/user/paymentOfCateringServices')
 const notificationUserRoute = require ('./route/user/notification')
 const reviewRoute = require('./route/user/review')




/// admin routes require
const adminAuthRoutes = require('./route/admin/adminCreate');
const paymentAdminRoute = require('./route/admin/payment')
const coupenAdminRoute = require('./route/admin/coupen')
const cancellationAdminRoute = require('./route/admin/cancellationPolicy')
const booking = require('./route/admin/booking')
const bookingCateringServicesAdminRoute = require('./route/admin/bookingOfCateringServices')
const paymentOfCateringServiceAdminRoute = require('./route/admin/paymentOfCateringServices')
const notificationAdminRoute = require('./route/admin/notification')
const restaurantCreate = require("./route/admin/restaurantCreate")
const userCreate = require("./route/admin/userCreate")
const deliveryAgents = require ('./route/admin/deliveryAgents')
const privacy = require('./route/admin/privacy')
const aboutus  = require('./route/admin/aboutus')
//const subscription = require('./route/admin/subscription')
//const reviewAdminRoute = require('./route/admin/review')
//const bookingAdminRoutes = require('./route/admin/booking')
// const adminPlanTypeRoute = require('./routes/admin/PlanType.js/PlanType')



/// restaurant routes require
const restaurantRoutes = require('./route/restaurant/restaurantCreate');
const restaurantBannerRoutes = require('./route/restaurant/restaurantBanner');
const planTypeRoutes =  require('./route/restaurant/restaurantPlanType')
const mealRoute = require('./route/restaurant/restaurantMeal')
const dishesRoute = require('./route/restaurant/dishes')
const paymentRestaurantRoute  = require('./route/restaurant/payment')
const coupenRestaurantRoute = require('./route/restaurant/coupen')
const cancellationRestaurantRoute = require('./route/restaurant/cancellationPolicy')
const bookingCateringServicesRestaurantRoute = require('./route/restaurant/bookingOfCateringServices')
const paymentOfCateringServicesRestaurantRoute = require('./route/restaurant/paymentOfCateringServices')
const notificationRestaurantRoute = require('./route/restaurant/notification')
//const reviewRestaurantRoute = require("./route/restaurant/review")
const bookingRestaurantRoutes = require('./route/restaurant/booking')




/*
   Require Routes End
*/



/*
    Use Routes
*/

/// user routes use
app.use('/api', userCreateRoutes);
app.use('/api',getRestaurantByUser)
app.use('/api',bookingRoutes)
app.use('/api',paymentRoute)
app.use('/api',coupenRoute)
app.use('/api',cancellationPolicyRoute)
app.use('/api',bookingCateringServicesRoute)
app.use('/api',paymentOfCateringServiceRoute)
app.use('/api',notificationUserRoute)
app.use('/api',reviewRoute)


/// admin routes use
app.use('/api', adminAuthRoutes);
app.use('/api',paymentAdminRoute)
app.use('/api',coupenAdminRoute)
app.use('/api',cancellationAdminRoute)
app.use('/api',booking)
app.use('/api',bookingCateringServicesAdminRoute)
app.use('/api',paymentOfCateringServiceAdminRoute)
app.use('/api',notificationAdminRoute)
app.use('/api',restaurantCreate)
app.use('/api',userCreate)
app.use('/api', deliveryAgents)
app.use('/api',privacy)
app.use('/api',aboutus)
//app.use('/api',subscription)
//app.use('/api',reviewAdminRoute)
//app.use('/api',bookingAdminRoutes)



// /// restaurant routes use
app.use('/api', restaurantRoutes);
app.use('/api',restaurantBannerRoutes)
app.use('/api',planTypeRoutes)
app.use('/api',mealRoute)
app.use('/api',dishesRoute)
app.use('/api',paymentRestaurantRoute)
app.use('/api',coupenRestaurantRoute)
app.use('/api',cancellationRestaurantRoute)
app.use('/api',bookingCateringServicesRestaurantRoute)
app.use('/api',paymentOfCateringServicesRestaurantRoute)
app.use('/api',notificationRestaurantRoute)
//app.use('/api',reviewRestaurantRoute)
app.use('/api',bookingRestaurantRoutes)



/*
    Use Routes End
*/

app.use(function (error, req, res, next) {
    if (error.status) {
        return res.status(error.status).json({
            errorName: error.name,
            message: error.message
        })
    } else {
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
})

module.exports = app;
