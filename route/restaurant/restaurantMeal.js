const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//const { restaurantAuthMiddleware,adminAuthMiddleware ,userAuthMiddleware} = require('../../middleware/jwt');
const {createMeal,getMeal,editMeal } = require('../../controller/restaurant/restaurantMeal');
const {getMealByAdmin } = require('../../controller/admin/restaurantMeal');
const {getMealByUser } = require('../../controller/user/restaurantMeal');

router.route('/createMeal').post(/*restaurantAuthMiddleware,cpUpload,*/createMeal).get(/*restaurantAuthMiddleware,*/getMeal).patch(/*restaurantAuthMiddleware,cpUpload,*/editMeal);
router.route('/adminMeal').get(/*adminAuthMiddleware,*/getMealByAdmin)
router.route('/userMeal').get(/*userAuthMiddleware,*/getMealByUser)


module.exports = router;
