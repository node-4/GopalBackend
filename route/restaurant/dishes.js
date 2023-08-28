const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const { restaurantAuthMiddleware, adminAuthMiddleware, userAuthMiddleware } = require('../../middleware/jwt');
const { getDishByAdmin, getDishByIdByAdmin, searchDishByUserAccToNumRatingByAdmin, createDishByAdmin, editDishByAdmin, editDishByIdByAdmin, getDishByIdOfRestaurantByAdmin, deleteDishesByAdmin } = require('../../controller/admin/dishes');
const { createDish, getDish, editDish, getDishByIdOfRestaurant, getdishesByName } = require('../../controller/restaurant/dishes');
const { getDishByUser, getDishByIdByUser, searchDishByUserAccToNumRating } = require('../../controller/user/dishes');


//RESTAURANT
router.route('/createDishes').post(restaurantAuthMiddleware,/*cpUpload,*/createDish).get(/*restaurantAuthMiddleware,*/getDish).patch(restaurantAuthMiddleware,/*cpUpload,*/editDish)
router.route('/getDishes/:id').get(/*restaurantAuthMiddleware,*/getDishByIdOfRestaurant)
router.route('/getdishesByName/:dishName').get(getdishesByName)


//ADMIN
router.route('/adminDishes').get(adminAuthMiddleware, getDishByAdmin)
router.route('/getDishByIdByAdmin/:id').get(getDishByIdByAdmin)
router.route('/searchDishByUserAccToNumRatingByAdmin/:dishName').get(adminAuthMiddleware, searchDishByUserAccToNumRatingByAdmin)
router.route('/createDishByAdmin').post(createDishByAdmin)
router.route('/editDishByAdmin/:id').put(editDishByAdmin)
router.route('/editDishByIdByAdmin/:id').put(editDishByIdByAdmin)
router.route('/getDishByIdOfRestaurantByAdmin/:id').get(getDishByIdOfRestaurantByAdmin)
router.route('/deleteDishesByAdmin/:id').delete(deleteDishesByAdmin)


//USER
router.route('/getDish/ByUser').get(userAuthMiddleware, getDishByUser)
router.route('/getDishByIdByUser/:id').get(userAuthMiddleware, getDishByIdByUser)//
router.route('/searchDishByUserAccToNumRating/:dishName').get(userAuthMiddleware, searchDishByUserAccToNumRating)

module.exports = router;
