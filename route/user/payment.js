const express = require('express');
//const  payment = require('../controllers/admin/payment')
const customer = require('../../controller/user/payment')
const paymentRouter = express();

//customer
paymentRouter.post('/users/CreatePaymentOrder/:id', customer.CreatePaymentOrder),
paymentRouter.get('/users/GetPaymentsByUserId/:user', customer.GetPaymentsByUserId)


module.exports = paymentRouter;