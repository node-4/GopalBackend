const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { restaurantAuthMiddleware, adminAuthMiddleware, userAuthMiddleware } = require('../../middleware/jwt');
const { getDishByAdmin, getDishByIdByAdmin, searchDishByUserAccToNumRatingByAdmin, createDishByAdmin, editDishByAdmin, editDishByIdByAdmin, getDishByIdOfRestaurantByAdmin, deleteDishesByAdmin } = require('../../controller/admin/dishes');
const { createDish, getDish, editDish, getDishByIdOfRestaurant, getdishesByName } = require('../../controller/restaurant/dishes');
const { getDishByUser, getDishByIdByUser, searchDishByUserAccToNumRating } = require('../../controller/user/dishes');
module.exports = (app) => {
        // RESTAURANT
        app.post('/api/createDishes', restaurantAuthMiddleware,/*cpUpload,*/createDish);
        app.get('/api/createDishes', /*restaurantAuthMiddleware,*/ getDish);
        app.patch('/api/createDishes', restaurantAuthMiddleware,/*cpUpload,*/ editDish);
        app.get('/api/getDishes/:id', /*restaurantAuthMiddleware,*/ getDishByIdOfRestaurant);
        app.get('/api/getdishesByName/:dishName', getdishesByName);

        // ADMIN
        app.get('/api/adminDishes', adminAuthMiddleware, getDishByAdmin);
        app.get('/api/getDishByIdByAdmin/:id', getDishByIdByAdmin);
        app.get('/api/searchDishByUserAccToNumRatingByAdmin/:dishName', adminAuthMiddleware, searchDishByUserAccToNumRatingByAdmin);
        app.post('/api/createDishByAdmin', createDishByAdmin);
        app.put('/api/editDishByAdmin/:id', editDishByAdmin);
        app.put('/api/editDishByIdByAdmin/:id', editDishByIdByAdmin);
        app.get('/api/getDishByIdOfRestaurantByAdmin/:id', getDishByIdOfRestaurantByAdmin);
        app.delete('/api/deleteDishesByAdmin/:id', deleteDishesByAdmin);

        // USER
        app.get('/api/getDish/ByUser', userAuthMiddleware, getDishByUser);
        app.get('/api/getDishByIdByUser/:id', userAuthMiddleware, getDishByIdByUser);
        app.get('/api/searchDishByUserAccToNumRating/:dishName', userAuthMiddleware, searchDishByUserAccToNumRating);
};
