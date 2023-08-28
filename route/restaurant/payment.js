const express = require('express');
//const  payment = require('../controllers/admin/payment')
const restaurant = require('../../controller/restaurant/payment')
const paymentRouter = express();

//RESTAURANT
paymentRouter.get('/restaurant/GetPaymentByRestaurantId/:id', restaurant.GetPaymentByRestaurantId)
paymentRouter.get('/GetpaymentOfCateringByRestaurantId/:id', restaurant.GetpaymentOfCateringByRestaurantId)
paymentRouter.get('/GetAllPaymentsOfCateringByRestaurant', restaurant.GetAllPaymentsOfCateringByRestaurant)
paymentRouter.post('/CreatePaymentByRestaurant/:id', restaurant.CreatePaymentByRestaurant)
paymentRouter.get('/GetPaymentOfCateringServicesByRestaurant/:user', restaurant.GetPaymentOfCateringServicesByRestaurant)
paymentRouter.put('/updatecateringPaymentByRestaurant/:id', restaurant.updatecateringPaymentByRestaurant)
paymentRouter.delete('/deletecateringsPaymentByRestaurant/:id', restaurant.deletecateringsPaymentByRestaurant)

module.exports = paymentRouter;