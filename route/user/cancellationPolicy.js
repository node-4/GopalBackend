const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//const { adminAuthMiddleware} = require('../../middleware/jwt');
const { getAllCancellationPolicyByUser, getCancellationPolicyByIdByUser } = require('../../controller/user/cancellationPolicy');

module.exports = (app) => {
        app.get('/api/getAllCancellationPolicyByUser', getAllCancellationPolicyByUser);
        app.get('/api/getCancellationPolicyByIdByUser/:id', getCancellationPolicyByIdByUser);
}