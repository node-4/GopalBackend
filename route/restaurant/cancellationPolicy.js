const express = require('express');
const router = express.Router();
const createError = require('http-errors');
//const { adminAuthMiddleware} = require('../../middleware/jwt');
const { getAllCancellationPolicyByRestaurant, getCancellationPolicyByIdByRestaurant } = require('../../controller/restaurant/cancellationPolicy');
module.exports = (app) => {
        app.get('/api/getAll/CancellationPolicyByRestaurant', getAllCancellationPolicyByRestaurant);
        app.get('/api/getCancellationPolicyByIdByRestaurant/:id', getCancellationPolicyByIdByRestaurant);
}