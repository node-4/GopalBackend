const express = require('express');
//const  payment = require('../controllers/admin/payment')
const GetpaymentOfCatering = require('../../controller/restaurant/paymentOfCateringServices')
const paymentRouter = express();

//RESTAURANT
paymentRouter.get('/GetpaymentOfCateringByRestaurantId/:id', GetpaymentOfCatering.GetpaymentOfCateringByRestaurantId)
paymentRouter.get('/GetAllPaymentsOfCateringByRestaurant', GetpaymentOfCatering.GetAllPaymentsOfCateringByRestaurant)
paymentRouter.post('/CreatePaymentOfCateringByRestaurant/:id', GetpaymentOfCatering.CreatePaymentOfCateringByRestaurant)
paymentRouter.get('/GetPaymentOfCateringServicesByRestaurant/:user', GetpaymentOfCatering.GetPaymentOfCateringServicesByRestaurant)
paymentRouter.put('/updatecateringPaymentByRestaurant/:id', GetpaymentOfCatering.updatecateringPaymentByRestaurant)
paymentRouter.delete('/deletecateringsPaymentByRestaurant/:id', GetpaymentOfCatering.deletecateringsPaymentByRestaurant)

module.exports = paymentRouter;