const express = require('express');
const router = express.Router();

const { userAuthMiddleware } = require('../../middleware/jwt');
const createError = require('http-errors');

const { signUp, signIn, loginUserSendOtp, verifySignIn, loginUserVerifyOtp, socialLogin, addDetails, saveCurrentLocation, getCurrentUser, editCurrentUser } = require('../../controller/user/user.create');

module.exports = (app) => {
        app.post("/api/users/signUp", signUp);
        app.post("/api/users/signIn", signIn);
        app.post("/api/users/sendOtp", loginUserSendOtp);
        // app.post("/api/users/verifyOtp", verifySignIn);
        app.post("/api/users/loginUserVerifyOtp", loginUserVerifyOtp);
        app.post("/api/users/socialLogin", socialLogin);
        app.patch("/api/users/add-details", userAuthMiddleware, addDetails);
        app.patch("/api/users/save-location", userAuthMiddleware, saveCurrentLocation);
        app.get("/api/users/me", userAuthMiddleware, getCurrentUser);
        app.patch("/api/users/me", userAuthMiddleware,/* upload.single('profile'),*/ editCurrentUser);
}

