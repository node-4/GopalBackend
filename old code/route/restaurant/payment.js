const express = require('express');
//const  payment = require('../controllers/admin/payment')
const restaurant = require('../../controller/restaurant/payment')
const paymentRouter = express();

module.exports = (app) => {
        app.get('/api/restaurant/GetPaymentByRestaurantId/:id', restaurant.GetPaymentByRestaurantId);
        app.get('/api/GetpaymentOfCateringByRestaurantId/:id', restaurant.GetpaymentOfCateringByRestaurantId);
        app.get('/api/GetAllPaymentsOfCateringByRestaurant', restaurant.GetAllPaymentsOfCateringByRestaurant);
        app.post('/api/CreatePaymentByRestaurant/:id', restaurant.CreatePaymentByRestaurant);
        app.get('/api/GetPaymentOfCateringServicesByRestaurant/:user', restaurant.GetPaymentOfCateringServicesByRestaurant);
        app.put('/api/updatecateringPaymentByRestaurant/:id', restaurant.updatecateringPaymentByRestaurant);
        app.delete('/api/deletecateringsPaymentByRestaurant/:id', restaurant.deletecateringsPaymentByRestaurant);
};
