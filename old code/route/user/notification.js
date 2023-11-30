const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//const { adminAuthMiddleware} = require('../../middleware/jwt');
const { getAllNotificationByUser, getNotificationByIdByUser } = require('../../controller/user/notification');

module.exports = (app) => {
        app.get('/api/getAllNotificationByUser', getAllNotificationByUser);
        app.get('/api/getNotificationByIdByUser/:id', getNotificationByIdByUser);
}