const express = require('express');
//const  payment = require('../controllers/admin/payment')
const AdminPayment = require('../../controller/admin/payment')
const paymentRouter = express();

//ADMIN

paymentRouter.get('/users/GetAllPaymentsByAdmin', AdminPayment.GetAllPaymentsByAdmin)
paymentRouter.get('/GetPaymentsByUserIdByAdmin/:user', AdminPayment.GetPaymentsByUserIdByAdmin)
paymentRouter.put('/updatePaymentOrder/:id', AdminPayment.updatePaymentOrder)
paymentRouter.delete('/deletePaymentById/:id', AdminPayment.deletePaymentById)

module.exports = paymentRouter;