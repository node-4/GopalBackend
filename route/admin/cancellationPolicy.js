const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//const { restaurantAuthMiddleware} = require('../../middleware/jwt');
const { createCancellationPolicy,getCancellationPolicy,deleteCancellationPolicyById,getAllCancellationPolicy} = require('../../controller/admin/cancellationPolicy');

router.route('/createCancellationPolicy').post(createCancellationPolicy)
router.route('/getCancellationPolicy/:id').get(getCancellationPolicy)
router.route('/getAllCancellationPolicy').get(getAllCancellationPolicy)
router.route('/deleteCancellationPolicyById/:id').delete(deleteCancellationPolicyById);


module.exports = router;