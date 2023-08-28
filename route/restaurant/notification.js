const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//const { adminAuthMiddleware} = require('../../middleware/jwt');
const {getAllNotificationByRestaurant,getNotificationByIdByRestaurant} = require('../../controller/restaurant/notification');


router.route('/getAllNotificationByRestaurant').get(getAllNotificationByRestaurant)
router.route('/getNotificationByIdByRestaurant/:id').get(getNotificationByIdByRestaurant)


module.exports = router;