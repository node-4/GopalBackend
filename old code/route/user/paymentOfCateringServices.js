const express = require('express');
//const  payment = require('../controllers/admin/payment')
const customer = require('../../controller/user/paymentOfCateringservices')
module.exports = (app) => {
        app.post('/api/users/CreatePaymentOrderOfCateringServices/:id', customer.CreatePaymentOrderOfCateringServices);
        app.get('/api/users/GetPaymentOrderOfCateringServicesByUserId/:user', customer.GetPaymentOrderOfCateringServicesByUserId);
}