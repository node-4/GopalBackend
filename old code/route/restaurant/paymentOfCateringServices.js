const express = require('express');
//const  payment = require('../controllers/admin/payment')
const GetpaymentOfCatering = require('../../controller/restaurant/paymentOfCateringServices')
const paymentRouter = express();
module.exports = (app) => {

        // RESTAURANT
        app.get('/api/GetpaymentOfCateringByRestaurantId/:id', GetpaymentOfCatering.GetpaymentOfCateringByRestaurantId);
        app.get('/api/GetAllPaymentsOfCateringByRestaurant', GetpaymentOfCatering.GetAllPaymentsOfCateringByRestaurant);
        app.post('/api/CreatePaymentOfCateringByRestaurant/:id', GetpaymentOfCatering.CreatePaymentOfCateringByRestaurant);
        app.get('/api/GetPaymentOfCateringServicesByRestaurant/:user', GetpaymentOfCatering.GetPaymentOfCateringServicesByRestaurant);
        app.put('/api/updatecateringPaymentByRestaurant/:id', GetpaymentOfCatering.updatecateringPaymentByRestaurant);
        app.delete('/api/deletecateringsPaymentByRestaurant/:id', GetpaymentOfCatering.deletecateringsPaymentByRestaurant);
};
