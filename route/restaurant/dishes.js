const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const auth = require('../../middleware/jwt');
const controller = require('../../controller/restaurant/dishes');
const { productUpload, upload, bannerUpload, blogUpload, gallaryUpload, NutritionUpload, ProductTypeUpload, SkinConditionUpload, SkinTypeUpload,
        aboutusUpload, subCategoryUpload, categoryUpload, userProfileUpload, serviceUpload, BrandUpload, E4UUpload, offerUpload } = require('../../middleware/imageUpload')


module.exports = (app) => {
        app.post('/api/createDishes', auth.restaurantAuthMiddleware, upload.single('image'), controller.createDish);
        app.get('/api/Dish/getDishes', auth.restaurantAuthMiddleware, controller.getDish);
        app.get('/api/Dish/getDishforSearch', controller.getDishforSearch);
        app.get('/api/Dish/getDishesByRestaurant/:id', controller.getDishByIdOfRestaurant);
        app.get('/api/getdishesByName/:dishName', controller.getdishesByName);
        app.patch('/api/Dish/update/:id', auth.restaurantAuthMiddleware, upload.single('image'), controller.editDish);
        app.get('/api/Dish/getDishByID/:id', controller.getDishByID);
        app.delete('/api/Dish/deleteDish/:id', auth.restaurantAuthMiddleware, controller.deleteDish);
};
