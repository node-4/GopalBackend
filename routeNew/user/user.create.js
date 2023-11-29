const express = require('express');
const router = express.Router();
const auth = require('../../middleware/jwt');
const createError = require('http-errors');
const controller = require('../../controllerNew/user/userController');
const { productUpload, upload, bannerUpload, blogUpload, gallaryUpload, NutritionUpload, ProductTypeUpload, SkinConditionUpload, SkinTypeUpload,
        aboutusUpload, subCategoryUpload, categoryUpload, userProfileUpload, serviceUpload, BrandUpload, E4UUpload, offerUpload } = require('../../middleware/imageUpload')

module.exports = (app) => {
        app.post("/api/users/signUp", controller.signUp);
        app.post("/api/users/signIn", controller.signIn);
        app.patch("/api/users/save-location", auth.userAuthMiddleware, controller.saveCurrentLocation);
        app.post("/api/users/sendOtp", controller.loginUserSendOtp);
        app.post("/api/users/loginUserVerifyOtp", controller.loginUserVerifyOtp);
        app.post("/api/users/socialLogin", controller.socialLogin);
        app.get("/api/users/me", auth.userAuthMiddleware, controller.getProfile);
        app.patch("/api/users/add-details", auth.userAuthMiddleware, controller.addDetails);
        app.patch("/api/users/me", auth.userAuthMiddleware, upload.single('profile'), controller.editCurrentUser);
        app.get("/api/users/getAllrestaurant", auth.userAuthMiddleware, controller.getAllrestaurant)
        app.get("/api/users/getAllHomeCarriageRestaurant", auth.userAuthMiddleware, controller.getAllHomeCarriageRestaurant);
        app.get("/api/users/getAllCateringServicesRestaurant", auth.userAuthMiddleware, controller.getAllCateringServicesRestaurant);
}

