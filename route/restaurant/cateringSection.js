const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const auth = require('../../middleware/jwt');
const controller = require('../../controller/restaurant/cateringSection');
const { productUpload, upload, bannerUpload, blogUpload, gallaryUpload, NutritionUpload, ProductTypeUpload, SkinConditionUpload, SkinTypeUpload,
        aboutusUpload, subCategoryUpload, categoryUpload, userProfileUpload, serviceUpload, BrandUpload, E4UUpload, offerUpload } = require('../../middleware/imageUpload')


module.exports = (app) => {
        app.post('/api/Catering/createDishes', auth.restaurantAuthMiddleware, upload.single('image'), controller.createDish);
        app.get('/api/Catering/getDishes', auth.restaurantAuthMiddleware, controller.getDish);
        app.get('/api/Catering/getDishesByRestaurant/:id', controller.getDishByIdOfRestaurant);
        app.get('/api/Catering/getDishesByName/:dishName', controller.getDishesByName);
        app.patch('/api/Catering/update/:id', auth.restaurantAuthMiddleware, upload.single('image'), controller.editDish);
        app.get('/api/Catering/getDishByID/:id', controller.getDishByID);
        app.delete('/api/Catering/deleteDish/:id', auth.restaurantAuthMiddleware, controller.deleteDish);
        app.post('/api/Catering/createCateringService', auth.restaurantAuthMiddleware, controller.createCateringService);
        app.get('/api/Catering/getAllCateringServices', auth.restaurantAuthMiddleware, controller.getAllCateringServices);
        app.get('/api/Catering/getCateringServicesByIdOfRestaurant/:id', auth.restaurantAuthMiddleware, controller.getCateringServicesByIdOfRestaurant);
        app.get('/api/Catering/getCateringServiceById/:id', auth.restaurantAuthMiddleware, controller.getCateringServiceById);
        app.patch('/api/Catering/updateCateringService/:id', auth.restaurantAuthMiddleware, controller.updateCateringService);
        app.delete('/api/Catering/deleteCateringService/:id', auth.restaurantAuthMiddleware, controller.deleteCateringService);
        app.get("/api/v1/Catering/InquiryCatering", [auth.restaurantAuthMiddleware], controller.getCateringQuery);
};
