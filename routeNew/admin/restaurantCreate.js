const express = require("express");
const router = express.Router();
const restaurantCreate = require("../../controllerNew/admin/restaurantCreate");
const adminAuth = require("../../middleware/jwt");

module.exports = (app) => {
  app.post('/api/admin/restaurant/register1', restaurantCreate.registerRestaurant);
  app.put('/api/admin/updateLocationOfRestaurant/:id', adminAuth.adminAuthMiddleware, restaurantCreate.updateLocationOfRestaurant);
  app.get('/api/admin/restaurant/me/:id', adminAuth.adminAuthMiddleware, restaurantCreate.restaurantById);
  app.put('/api/admin/updateMeRestaurant/:id', adminAuth.adminAuthMiddleware, restaurantCreate.updateRestaurant);
  app.delete('/api/admin/deleteByRestaurant/:id', adminAuth.adminAuthMiddleware, restaurantCreate.deleteByRestaurant);
  app.get('/api/admin/restaurant/getAll', restaurantCreate.getAllrestaurant);
};
