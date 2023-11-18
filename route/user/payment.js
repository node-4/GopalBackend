const express = require('express');
//const  payment = require('../controllers/admin/payment')
const customer = require('../../controller/user/payment')
const paymentRouter = express();
module.exports = (app) => {
        app.post('/api/users/CreatePaymentOrder/:id', customer.CreatePaymentOrder);
        app.get('/api/users/GetPaymentsByUserId/:user', customer.GetPaymentsByUserId);
}