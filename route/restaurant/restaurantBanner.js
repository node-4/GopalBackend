const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const { restaurantAuthMiddleware, adminAuthMiddleware, userAuthMiddleware } = require('../../middleware/jwt');
const { addBanner, getBanner, updateBanner, deleteBanner, } = require('../../controller/restaurant/restaurantBanner');
const { getBannerByAdmin } = require('../../controller/admin/restaurantBanner');
const { getBannerByUser } = require('../../controller/user/restaurantBanner');


//restaurant
router.route('/banner').post(/*restaurantAuthMiddleware,/*cpUpload,*/addBanner).get(/*restaurantAuthMiddleware,*/getBanner)
router.route('/adminbanner').get(/*adminAuthMiddleware,*/getBannerByAdmin)
router.route('/user/banner').get(/*userAuthMiddleware,*/getBannerByUser)
router.route('/updateBanner/:id').put(/*restaurantAuthMiddleware,/*cpUpload,*/updateBanner)
router.route('/deleteBanner/:id').delete(deleteBanner)


module.exports = router;
