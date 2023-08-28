const express = require('express');
const router = express.Router();
const { restaurantAuthMiddleware } = require('../../middleware/jwt');
const {registerRestaurant,restaurantLogin, updateLocation, me, updateMeRestaurant,getAllrestaurant,updateSubscription} = require('../../controller/restaurant/restaurantCreate');


router.route('/restaurant/register').post(/*cpUpload,*/registerRestaurant);
router.route('/restaurant/login').post(restaurantLogin);
router.route('/restaurant/save-location').patch(restaurantAuthMiddleware,updateLocation);
router.route('/updateSubscription').patch(restaurantAuthMiddleware,updateSubscription);
router.route('/restaurant/me').get(restaurantAuthMiddleware,me).patch(restaurantAuthMiddleware/*,cpUpload*/,updateMeRestaurant);
router.route('/getAll').get(getAllrestaurant)


module.exports = router;