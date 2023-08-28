const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const {userAuthMiddleware} = require('../../middleware/jwt');
const {getAllCouponsOfRestaurantByUser,getCouponsOfRestaurantByIdByUser } = require('../../controller/user/coupen');


router.route('/getAllCouponsOfRestaurantByUser').get(userAuthMiddleware,getAllCouponsOfRestaurantByUser)
router.route('/getCouponsOfRestaurantByIdByUser/:restaurantId').get(userAuthMiddleware,getCouponsOfRestaurantByIdByUser)


module.exports = router;