const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const { userAuthMiddleware } = require('../../middleware/jwt');
const { getAllCouponsOfRestaurantByUser, getCouponsOfRestaurantByIdByUser } = require('../../controller/user/coupen');

module.exports = (app) => {
        app.get('/api/getAllCouponsOfRestaurantByUser', userAuthMiddleware, getAllCouponsOfRestaurantByUser);
        app.get('/api/getCouponsOfRestaurantByIdByUser/:restaurantId', userAuthMiddleware, getCouponsOfRestaurantByIdByUser);
}