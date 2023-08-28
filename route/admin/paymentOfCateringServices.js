const express = require('express');
//const  payment = require('../controllers/admin/payment')
const AdminPayment = require('../../controller/admin/paymentOfCateringServices')
const paymentRouter = express();

//ADMIN

paymentRouter.get('/users/GetAllPaymentsOfCateringByAdmin', AdminPayment.GetAllPaymentsOfCateringByAdmin)
paymentRouter.get('/GetPaymentOfCateringServicesByAdmin/:user', AdminPayment.GetPaymentOfCateringServicesByAdmin)
paymentRouter.put('/updatecateringPaymentOrder/:id', AdminPayment.updatecateringPaymentOrder)
paymentRouter.delete('/deletecateringsPaymentById', AdminPayment.deletecateringsPaymentById)


module.exports = paymentRouter;