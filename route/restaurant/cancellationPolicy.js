const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//const { adminAuthMiddleware} = require('../../middleware/jwt');
const {getAllCancellationPolicyByRestaurant,getCancellationPolicyByIdByRestaurant} = require('../../controller/restaurant/cancellationPolicy');


 router.route('/getAllCancellationPolicyByRestaurant').get(getAllCancellationPolicyByRestaurant)
 router.route('/getCancellationPolicyByIdByRestaurant/:id').get(getCancellationPolicyByIdByRestaurant)

module.exports = router;