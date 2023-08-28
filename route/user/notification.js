const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//const { adminAuthMiddleware} = require('../../middleware/jwt');
const {getAllNotificationByUser,getNotificationByIdByUser} = require('../../controller/user/notification');


router.route('/getAllNotificationByUser').get(getAllNotificationByUser)
router.route('/getNotificationByIdByUser/:id').get(getNotificationByIdByUser)


module.exports = router;