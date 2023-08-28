const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const { restaurantAuthMiddleware} = require('../../middleware/jwt');
const {createCouponByRestaurant,getAllCouponsOfRestaurant,deleteCouponById } = require('../../controller/restaurant/coupen');

router.route('/createcoupen').post(restaurantAuthMiddleware,/*cpUpload,*/createCouponByRestaurant)
router.route('/getAllCouponsOfRestaurant/:coupencode').get(restaurantAuthMiddleware,getAllCouponsOfRestaurant)
router.route('/deleteCouponById/:couponId').delete(restaurantAuthMiddleware,/*cpUpload,*/deleteCouponById);
router.route('/')
// router.route('/adminMeal').get(/*adminAuthMiddleware,*/getMealByAdmin)
// router.route('/userMeal').get(/*userAuthMiddleware,*/getMealByUser)


module.exports = router;