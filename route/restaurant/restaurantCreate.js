const express = require('express');
const router = express.Router();
const { restaurantAuthMiddleware } = require('../../middleware/jwt');
const { registerRestaurant, restaurantLogin, updateLocation, me, updateMeRestaurant, getAllrestaurant, updateSubscription } = require('../../controller/restaurant/restaurantCreate');

module.exports = (app) => {
        app.post('/api/restaurant/register', /*cpUpload,*/ registerRestaurant);
        app.post('/api/restaurant/login', restaurantLogin);
        app.patch('/api/restaurant/save-location', restaurantAuthMiddleware, updateLocation);
        app.patch('/api/updateSubscription', restaurantAuthMiddleware, updateSubscription);
        app.get('/api/restaurant/me', restaurantAuthMiddleware, me);
        app.patch('/api/restaurant/me', restaurantAuthMiddleware/*,cpUpload*/, updateMeRestaurant);
        app.get('/api/getAll', getAllrestaurant);
};
