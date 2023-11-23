const express = require('express');
const router = express.Router();
const controller = require('../../controllerNew/admin/cancellationPolicy');
module.exports = (app) => {

        app.post('/api/createCancellationPolicy', controller.createCancellationPolicy);
        app.get('/api/getCancellationPolicy/:id', controller.getCancellationPolicy);
        app.get('/api/getAllCancellationPolicy', controller.getAllCancellationPolicy);
        app.delete('/api/deleteCancellationPolicyById/:id', controller.deleteCancellationPolicyById);
};
