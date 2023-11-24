const express = require('express');
const controller = require('../../controllerNew/restaurant/cancellationPolicy');
module.exports = (app) => {
        app.get('/api/getAll/CancellationPolicyByRestaurant', controller.getAllCancellationPolicyByRestaurant);
        app.get('/api/getCancellationPolicyByIdByRestaurant/:id', controller.getCancellationPolicyByIdByRestaurant);
}