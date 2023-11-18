const express = require('express');
//const  payment = require('../controllers/admin/payment')
const AdminPayment = require('../../controller/admin/payment')
const paymentRouter = express();
module.exports = (app) => {

        app.get('/api/users/GetAllPaymentsByAdmin', AdminPayment.GetAllPaymentsByAdmin);
        app.get('/api/GetPaymentsByUserIdByAdmin/:user', AdminPayment.GetPaymentsByUserIdByAdmin);
        app.put('/api/updatePaymentOrder/:id', AdminPayment.updatePaymentOrder);
        app.delete('/api/deletePaymentById/:id', AdminPayment.deletePaymentById);
};
