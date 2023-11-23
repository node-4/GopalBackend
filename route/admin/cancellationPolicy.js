const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//const { restaurantAuthMiddleware} = require('../../middleware/jwt');
const { createCancellationPolicy, getCancellationPolicy, deleteCancellationPolicyById, getAllCancellationPolicy } = require('../../controller/admin/cancellationPolicy');
module.exports = (app) => {

        app.post('/api/createCancellationPolicy', createCancellationPolicy);
        app.get('/api/getCancellationPolicy/:id', getCancellationPolicy);
         app.get('/api/getAllCancellationPolicy', getAllCancellationPolicy);
        app.delete('/api/deleteCancellationPolicyById/:id', deleteCancellationPolicyById);
};
