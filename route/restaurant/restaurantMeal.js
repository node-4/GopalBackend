const express = require('express');
const router = express.Router();
const createError = require('http-errors');
//const { restaurantAuthMiddleware,adminAuthMiddleware ,userAuthMiddleware} = require('../../middleware/jwt');
const { createMeal, getMeal, editMeal } = require('../../controller/restaurant/restaurantMeal');
const { getMealByAdmin } = require('../../controller/admin/restaurantMeal');
const { getMealByUser } = require('../../controller/user/restaurantMeal');
module.exports = (app) => {
        // MEAL
        app.post('/api/createMeal', /*restaurantAuthMiddleware, cpUpload,*/ createMeal);
        app.get('/api/createMeal', /*restaurantAuthMiddleware,*/ getMeal);
        app.patch('/api/createMeal', /*restaurantAuthMiddleware, cpUpload,*/ editMeal);
        app.get('/api/adminMeal', /*adminAuthMiddleware,*/ getMealByAdmin);
        app.get('/api/user/Meal', /*userAuthMiddleware,*/ getMealByUser);
};
