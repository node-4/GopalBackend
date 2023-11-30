const express = require('express');
const router = express.Router();
const { socialLoginAdmin, addDetailsOfUserByadmin, saveCurrentLocationOfUserByAdmin, getCurrentUserOfUserByAdmin, editCurrentUserByAdmin, deleteUserByAdmin } = require('../../controller/admin/userCreate');
const { userAuthMiddleware } = require('../../middleware/jwt')
module.exports = (app) => {
        app.put('/api/addDetailsOfUserByadmin', userAuthMiddleware, addDetailsOfUserByadmin);
        app.post('/api/socialLoginAdmin', socialLoginAdmin);
        app.put('/api/saveCurrentLocationOfUserByAdmin', userAuthMiddleware, saveCurrentLocationOfUserByAdmin);
        app.get('/api/getCurrentUserOfUserByAdmin', userAuthMiddleware, getCurrentUserOfUserByAdmin);
        app.put('/api/editCurrentUserByAdmin', userAuthMiddleware, editCurrentUserByAdmin);
        app.delete('/api/deleteUserByAdmin/:categoryId', /*restaurantAuthMiddleware,*/ deleteUserByAdmin);
};
