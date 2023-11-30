const express = require('express');
const router = express.Router();

const { userAuthMiddleware } = require('../../middleware/jwt');
const createError = require('http-errors');

const { getRestaurantByUser, getAllRestaurantByUser, getAllRestaurantBytypeOfMealPlanType } = require('../../controller/user/getRestaurantCreate');


module.exports = (app) => {
        app.get('/api/users/getRestaurantByUser/:typeOfMeal', getRestaurantByUser);
        app.get('/api/users/getAllRestaurantByUser', getAllRestaurantByUser);
        app.get('/api/users/getAllRestaurantBytypeOfMealPlanType/:typeOfMeal/:Plantype', getAllRestaurantBytypeOfMealPlanType);

        //router.route('/users/me').get(userAuthMiddleware, getCurrentUser).patch(userAuthMiddleware,/* upload.single('profile'),*/ editCurrentUser);
}