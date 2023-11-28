const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const auth = require('../../middleware/jwt');
const controller = require('../../controllerNew/restaurant/kitchen');
const { productUpload, upload, bannerUpload, blogUpload, gallaryUpload, NutritionUpload, ProductTypeUpload, SkinConditionUpload, SkinTypeUpload,
        aboutusUpload, subCategoryUpload, categoryUpload, userProfileUpload, serviceUpload, BrandUpload, E4UUpload, offerUpload } = require('../../middleware/imageUpload')


module.exports = (app) => {
        app.post('/api/createKitchen', auth.restaurantAuthMiddleware, upload.single('image'), controller.createKitchen);
        app.get('/api/Kitchen/getKitchenes', auth.restaurantAuthMiddleware, controller.getAllKitchens);
        app.get('/api/Kitchen/getKitchenesById/:id', controller.getKitchenById);
        app.patch('/api/Kitchen/update/:id', auth.restaurantAuthMiddleware, upload.single('image'), controller.updateKitchen);
        app.delete('/api/Kitchen/deleteKitchen/:id', auth.restaurantAuthMiddleware, controller.deleteKitchen);
        app.post('/api/Kitchen/kitchenLogin', controller.kitchenLogin);
        app.get('/api/Kitchen/me', auth.kitchenAuthMiddleware, controller.me);
        app.post('/api/kitchen/uploadImage', auth.kitchenAuthMiddleware, upload.array('image'), controller.uploadDailyImageInKitchen);
        app.get('/api/kitchen/allDailyImageInKitchen', auth.kitchenAuthMiddleware, controller.allDailyImageInKitchen);
        app.get('/api/Kitchen/allDailyImageInKitchenbyDate/:kitchenId/:date', controller.allDailyImageInKitchenbyDate);
        app.post('/api/kitchen-subscriptions', auth.kitchenAuthMiddleware, controller.createKitchenSubscription);
        app.get('/api/kitchen-subscriptions/All', auth.kitchenAuthMiddleware, controller.getAllKitchenSubscription);
        app.get('/api/kitchen-subscriptions/:id', controller.getKitchenSubscriptionById);
        app.put('/api/kitchen-subscriptions/:id', auth.kitchenAuthMiddleware, controller.updateKitchenSubscription);
        app.delete('/api/kitchen-subscriptions/:id', auth.kitchenAuthMiddleware, controller.deleteKitchenSubscription);
        app.get('/api/kitchen-subscriptions/kitchen/:kitchenId', controller.getAllKitchenSubscriptionbyKitchenId);
        app.post('/api/Kitchen/createDishes', auth.kitchenAuthMiddleware, upload.single('image'), controller.createDish);
        app.get('/api/Kitchen/getDishes', auth.kitchenAuthMiddleware, controller.getDish);
        app.get('/api/Kitchen/getDishByIdOfKitchen/:id', controller.getDishByIdOfKitchen);
        app.get('/api/Kitchen/getdishesByName/:dishName', controller.getdishesByName);
        app.patch('/api/Kitchen/Dish/update/:id', auth.kitchenAuthMiddleware, upload.single('image'), controller.editDish);
        app.get('/api/Kitchen/Dish/getDishByID/:id', controller.getDishByID);
        app.delete('/api/Kitchen/Dish/deleteDish/:id', auth.kitchenAuthMiddleware, controller.deleteDish);
};