const express = require('express');
const router = express.Router();

const { userAuthMiddleware } = require('../../middleware/jwt');
const createError = require('http-errors');

const { loginUserSendOtp, verifySignIn,loginUserVerifyOtp,socialLogin, addDetails, saveCurrentLocation, getCurrentUser, editCurrentUser } = require('../../controller/user/user.create');


router.route('/users/sendOtp').post(loginUserSendOtp);
// router.route('/users/verifyOtp').post(verifySignIn); 
router.route('/users/loginUserVerifyOtp').post(loginUserVerifyOtp); //
router.route('/users/socialLogin').post(socialLogin); 
router.route('/users/add-details').patch(userAuthMiddleware, addDetails);
router.route('/users/save-location').patch(userAuthMiddleware, saveCurrentLocation);

router.route('/users/me').get(userAuthMiddleware, getCurrentUser).patch(userAuthMiddleware,/* upload.single('profile'),*/ editCurrentUser);

module.exports = router;

