const express = require('express');
//const  payment = require('../controllers/admin/payment')
const customer = require('../../controller/user/paymentOfCateringservices')
const paymentRouter = express();

//customer
paymentRouter.post('/users/CreatePaymentOrderOfCateringServices/:id', customer.CreatePaymentOrderOfCateringServices),
paymentRouter.get('/users/GetPaymentOrderOfCateringServicesByUserId/:user', customer.GetPaymentOrderOfCateringServicesByUserId)


module.exports = paymentRouter;