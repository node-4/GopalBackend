const express = require('express');
const router = express.Router();

const { userAuthMiddleware } = require('../../middleware/jwt');
const createError = require('http-errors');

const {getRestaurantByUser,getAllRestaurantByUser,getAllRestaurantBytypeOfMealPlanType } = require('../../controller/user/getRestaurantCreate');



router.route('/users/getRestaurantByUser/:typeOfMeal').get(/*userAuthMiddleware,*/getRestaurantByUser);
router.route('/users/getAllRestaurantByUser').get(/*userAuthMiddleware,*/getAllRestaurantByUser);
router.route('/users/getAllRestaurantBytypeOfMealPlanType/:typeOfMeal/:Plantype').get(/*userAuthMiddleware,*/getAllRestaurantBytypeOfMealPlanType);

//router.route('/users/me').get(userAuthMiddleware, getCurrentUser).patch(userAuthMiddleware,/* upload.single('profile'),*/ editCurrentUser);

module.exports = router;
