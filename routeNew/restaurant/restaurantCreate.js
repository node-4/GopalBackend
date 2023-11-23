const express = require('express');
const router = express.Router();
const auth = require('../../middleware/jwt');
const restaurantCreate = require('../../controllerNew/restaurant/restaurantCreate');

module.exports = (app) => {
        app.post('/api/restaurant/register', /*cpUpload,*/ restaurantCreate.registerRestaurant);
        app.post('/api/restaurant/login', restaurantCreate.restaurantLogin);
        app.patch('/api/restaurant/save-location', auth.restaurantAuthMiddleware, restaurantCreate.updateLocation);
        app.get('/api/restaurant/me', auth.restaurantAuthMiddleware, restaurantCreate.me);
        app.patch('/api/restaurant/me', auth.restaurantAuthMiddleware/*,cpUpload*/, restaurantCreate.updateMeRestaurant);
};
