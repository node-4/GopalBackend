const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//const { adminAuthMiddleware} = require('../../middleware/jwt');
const { createReviewOfRestaurantByUser, getAllReviewOfRestaurantByUser, updateReviewOfRestaurantByUser, deleteReviewOfRestaurantByUser, findAverageRatingforrestaurant, sortAccToAvgStarRatingforrestaurant } = require('../../controller/user/review');
module.exports = (app) => {
        app.post('/api/createReviewOfRestaurantByUser/:restaurantId', createReviewOfRestaurantByUser);
        app.get('/api/getAllReviewOfRestaurantByUser', getAllReviewOfRestaurantByUser);
        app.put('/api/updateReviewOfRestaurantByUser/:restaurantId', updateReviewOfRestaurantByUser);
        app.put('/api/deleteReviewOfRestaurantByUser/:restaurantId', deleteReviewOfRestaurantByUser);
        app.get('/api/findAverageRatingforrestaurant/:restaurantId', findAverageRatingforrestaurant);
        app.get('/api/sortAccToAvgStarRatingforrestaurant', sortAccToAvgStarRatingforrestaurant)
}
