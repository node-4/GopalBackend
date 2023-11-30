const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { restaurantAuthMiddleware } = require('../../middleware/jwt');
const { createCouponByRestaurant, getAllCouponsOfRestaurant, deleteCouponById } = require('../../controller/restaurant/coupen');
module.exports = (app) => {
        app.post('/api/createcoupen', restaurantAuthMiddleware,/*cpUpload,*/createCouponByRestaurant);
        app.get('/api/getAllCouponsOfRestaurant/:coupencode', getAllCouponsOfRestaurant);
        app.delete('/api/deleteCouponById/:couponId', restaurantAuthMiddleware,/*cpUpload,*/deleteCouponById);

        // router.route('/adminMeal').get(/*adminAuthMiddleware,*/getMealByAdmin)
        // router.route('/userMeal').get(/*userAuthMiddleware,*/getMealByUser)

}