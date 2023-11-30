const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const auth = require('../../middleware/jwt');
const controller = require('../../controller/admin/dishes');
const { productUpload, upload, bannerUpload, blogUpload, gallaryUpload, NutritionUpload, ProductTypeUpload, SkinConditionUpload, SkinTypeUpload,
        aboutusUpload, subCategoryUpload, categoryUpload, userProfileUpload, serviceUpload, BrandUpload, E4UUpload, offerUpload } = require('../../middleware/imageUpload')


module.exports = (app) => {
        app.post('/api/createDishByAdmin', auth.adminAuthMiddleware, upload.single('image'), controller.createDishByAdmin);
        app.get('/api/Dish/adminDishes', auth.adminAuthMiddleware, controller.getDishByAdmin);
        app.get('/api/Dish/getDishByIdOfRestaurantByAdmin/:id', controller.getDishByIdOfRestaurantByAdmin);
        app.get('/api/searchDishByUserAccToNumRatingByAdmin/:dishName', controller.searchDishByUserAccToNumRatingByAdmin);
        app.put('/api/Dish/editDishByAdmin/:id', auth.adminAuthMiddleware, upload.single('image'), controller.editDishByAdmin);
        app.get('/api/Dish/getDishByIdByAdmin/:id', controller.getDishByIdByAdmin);
        app.delete('/api/Dish/deleteDishesByAdmin/:id', auth.adminAuthMiddleware, controller.deleteDishesByAdmin);
};
