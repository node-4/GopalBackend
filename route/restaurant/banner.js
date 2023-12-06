const express = require('express');
const auth = require('../../middleware/jwt');
const controller = require('../../controller/restaurant/Banner');
const { productUpload, upload, bannerUpload, blogUpload, gallaryUpload, NutritionUpload, ProductTypeUpload, SkinConditionUpload, SkinTypeUpload,
        aboutusUpload, subCategoryUpload, categoryUpload, userProfileUpload, serviceUpload, BrandUpload, E4UUpload, offerUpload } = require('../../middleware/imageUpload')

module.exports = (app) => {
        app.post('/api/banner', auth.restaurantAuthMiddleware, upload.single('image'), controller.createBanner);
        app.get('/api/banner/All', controller.getBanner);
        app.get('/api/restaurantbanner', auth.restaurantAuthMiddleware, controller.getBannerOfRestaurant);
        app.put('/api/updateBanner/:id', auth.restaurantAuthMiddleware, upload.single('image'), controller.editBanner);
        app.delete('/api/deleteBanner/:id', controller.deleteBanner);
        app.get('/api/getBannerByID/:id', controller.getBannerByID);
};
