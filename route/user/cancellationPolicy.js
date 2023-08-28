const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//const { adminAuthMiddleware} = require('../../middleware/jwt');
const {getAllCancellationPolicyByUser,getCancellationPolicyByIdByUser} = require('../../controller/user/cancellationPolicy');


 router.route('/getAllCancellationPolicyByUser').get(getAllCancellationPolicyByUser)
 router.route('/getCancellationPolicyByIdByUser/:id').get(getCancellationPolicyByIdByUser)

module.exports = router;