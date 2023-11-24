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

};

