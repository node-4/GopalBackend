const express = require('express');
const router = express.Router();
const auth = require('../../middleware/jwt');
const createError = require('http-errors');
const controller = require('../../controller/user/userController');
const { productUpload, upload, bannerUpload, blogUpload, gallaryUpload, NutritionUpload, ProductTypeUpload, SkinConditionUpload, SkinTypeUpload,
        aboutusUpload, subCategoryUpload, categoryUpload, userProfileUpload, serviceUpload, BrandUpload, E4UUpload, offerUpload } = require('../../middleware/imageUpload')

module.exports = (app) => {
        app.post("/api/users/signUp", controller.signUp);
        app.post("/api/users/signIn", controller.signIn);
        app.post("/api/users/forgetPassword/:mobile", controller.forgetPassword);
        app.post("/api/users/resetPassword", controller.resetPassword);
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
        app.post('/api/users/subscribe', auth.userAuthMiddleware, controller.subscribe);
        app.post('/api/users/unsubscribe', auth.userAuthMiddleware, controller.unsubscribe);
        app.put('/api/users/verifyPayment/:id', auth.userAuthMiddleware, controller.verifyPayment);
        app.get('/api/users/mySubscribedPlans', auth.userAuthMiddleware, controller.mySubscribedPlans);
        app.post("/api/v1/user/address/new", [auth.userAuthMiddleware], controller.createAddress);
        app.get("/api/v1/user/getAddress", [auth.userAuthMiddleware], controller.getallAddress);
        app.delete('/api/v1/user/address/:id', [auth.userAuthMiddleware], controller.deleteAddress);
        app.get('/api/v1/user/address/:id', [auth.userAuthMiddleware], controller.getAddressbyId);
        app.post('/api/v1/user/cart/addToCart', [auth.userAuthMiddleware], controller.addToCart);
        app.delete("/api/v1/user/deleteCart", [authJwt.verifyToken], controller.deleteCart);
        app.put("/api/v1/user/deleteItemsfromCart/:cartItemId", [authJwt.verifyToken], auth.deleteItemsfromCart);
        app.get('/api/v1/user/cart/getCart', [auth.userAuthMiddleware], controller.getCart);
        app.post('/api/v1/user/order/checkout', [auth.userAuthMiddleware], controller.checkout);
        app.post("/api/v1/user/order/placeOrder/:orderId", [auth.userAuthMiddleware], controller.placeOrder);
        app.get("/api/v1/order/allOrders", [auth.userAuthMiddleware], controller.getAllOrders);
        app.get("/api/v1/order/Orders", [auth.userAuthMiddleware], controller.getOrders);
        app.get("/api/v1/order/viewOrder/:id", [auth.userAuthMiddleware], controller.getOrderbyId);
        app.post('/api/v1/CateringInquiry/createInquiryCatering', [auth.userAuthMiddleware], controller.createInquiryCatering);
        app.get("/api/v1/CateringInquiry/InquiryCatering", [auth.userAuthMiddleware], controller.getCateringQuery);
        app.get("/api/v1/CateringInquiry/viewCateringInquiry/:id", [auth.userAuthMiddleware], controller.getCateringQuerybyId)
        app.get('/api/getAllNotificationByUser', [auth.userAuthMiddleware], controller.getAllNotificationByUser);
        app.get('/api/getNotificationByIdByUser/:id', controller.getNotificationByIdByUser);
}

