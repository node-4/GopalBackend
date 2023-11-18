const express = require('express');
//const  payment = require('../controllers/admin/payment')
const AdminPayment = require('../../controller/admin/paymentOfCateringServices')
const paymentRouter = express();
module.exports = (app) => {

        app.get('/api/users/GetAllPaymentsOfCateringByAdmin', AdminPayment.GetAllPaymentsOfCateringByAdmin);
        app.get('/api/GetPaymentOfCateringServicesByAdmin/:user', AdminPayment.GetPaymentOfCateringServicesByAdmin);
        app.put('/api/updatecateringPaymentOrder/:id', AdminPayment.updatecateringPaymentOrder);
        app.delete('/api/deletecateringsPaymentById', AdminPayment.deletecateringsPaymentById);
};
