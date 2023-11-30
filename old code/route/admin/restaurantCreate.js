const express = require("express");
const router = express.Router();
const {
  registerRestaurant,
  restaurantLogin,
  updateLocationOfRestaurant,
  me,
  updateMeRestaurant,
  deleteByRestaurant,
} = require("../../controller/admin/restaurantCreate");
const { restaurantAuthMiddleware } = require("../../middleware/jwt");

module.exports = (app) => {

  app.post('/api/restaurant/register1', registerRestaurant);
  app.post('/api/restaurant/login', restaurantLogin);
  app.put('/api/updateLocationOfRestaurant', restaurantAuthMiddleware, updateLocationOfRestaurant);
  app.get('/api/restaurant/me', restaurantAuthMiddleware, me);
  app.put('/api/updateMeRestaurant', restaurantAuthMiddleware, updateMeRestaurant);
  app.delete('/api/deleteByRestaurant/:categoryId', /*restaurantAuthMiddleware,*/ deleteByRestaurant);
};
