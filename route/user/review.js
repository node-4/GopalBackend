const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//const { adminAuthMiddleware} = require('../../middleware/jwt');
const {createReviewOfRestaurantByUser,getAllReviewOfRestaurantByUser,updateReviewOfRestaurantByUser,deleteReviewOfRestaurantByUser,findAverageRatingforrestaurant,sortAccToAvgStarRatingforrestaurant} = require('../../controller/user/review');

router.route('/createReviewOfRestaurantByUser/:restaurantId').post(createReviewOfRestaurantByUser)
router.route('/getAllReviewOfRestaurantByUser').get(getAllReviewOfRestaurantByUser)
router.route('/updateReviewOfRestaurantByUser/:restaurantId').put(updateReviewOfRestaurantByUser)
router.route('/deleteReviewOfRestaurantByUser/:restaurantId').put(deleteReviewOfRestaurantByUser)
router.route('/findAverageRatingforrestaurant/:restaurantId').get(findAverageRatingforrestaurant)
router.route('/sortAccToAvgStarRatingforrestaurant').get(sortAccToAvgStarRatingforrestaurant)

module.exports = router;