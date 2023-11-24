const express = require('express');
const router = express.Router();
const controller = require('../../controllerNew/admin/cancellationPolicy');
module.exports = (app) => {

        app.post('/api/CancellationPolicy/createCancellationPolicy', controller.createCancellationPolicy);
        app.get('/api/CancellationPolicy/getCancellationPolicy/:id', controller.getCancellationPolicy);
        app.get('/api/CancellationPolicy/getAllCancellationPolicy', controller.getAllCancellationPolicy);
        app.delete('/api/CancellationPolicy/deleteCancellationPolicyById/:id', controller.deleteCancellationPolicyById);
};
