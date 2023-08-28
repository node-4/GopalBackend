const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const { adminAuthMiddleware} = require('../../middleware/jwt');
const { getAllCouponsOfRestaurantByAdmin,getCouponsOfRestaurantByIdByAdmin} = require('../../controller/admin/coupen');


router.route('/getAllCouponsOfRestaurantByAdmin').get(adminAuthMiddleware,getAllCouponsOfRestaurantByAdmin)
router.route('/getCouponsOfRestaurantByIdByAdmin/:restaurantId').get(adminAuthMiddleware,getCouponsOfRestaurantByIdByAdmin)


module.exports = router;