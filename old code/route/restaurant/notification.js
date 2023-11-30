const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//const { adminAuthMiddleware} = require('../../middleware/jwt');
const { getAllNotificationByRestaurant, getNotificationByIdByRestaurant } = require('../../controller/restaurant/notification');

module.exports = (app) => {
        app.get('/api/getAllNotificationByRestaurant', getAllNotificationByRestaurant);
        app.get('/api/getNotificationByIdByRestaurant/:id', getNotificationByIdByRestaurant);
};
