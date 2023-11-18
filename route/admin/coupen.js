const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const { adminAuthMiddleware } = require('../../middleware/jwt');
const { getAllCouponsOfRestaurantByAdmin, getCouponsOfRestaurantByIdByAdmin } = require('../../controller/admin/coupen');
module.exports = (app) => {

        app.get('/api/getAllCouponsOfRestaurantByAdmin', adminAuthMiddleware, getAllCouponsOfRestaurantByAdmin);
        app.get('/api/getCouponsOfRestaurantByIdByAdmin/:restaurantId', adminAuthMiddleware, getCouponsOfRestaurantByIdByAdmin);
};
