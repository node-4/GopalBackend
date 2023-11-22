const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const { restaurantAuthMiddleware, adminAuthMiddleware, userAuthMiddleware } = require('../../middleware/jwt');
const { addBanner, getBanner, updateBanner, deleteBanner, } = require('../../controller/restaurant/restaurantBanner');
const { getBannerByAdmin } = require('../../controller/admin/restaurantBanner');
const { getBannerByUser } = require('../../controller/user/restaurantBanner');
module.exports = (app) => {
        app.post('/api/banner', /*restaurantAuthMiddleware,/*cpUpload,*/ addBanner);
        app.get('/api/banner/All', /*restaurantAuthMiddleware,*/ getBanner);
        app.get('/api/adminbanner', /*adminAuthMiddleware,*/ getBannerByAdmin);
        app.get('/api/user/banner', /*userAuthMiddleware,*/ getBannerByUser);
        app.put('/api/updateBanner/:id', /*restaurantAuthMiddleware,/*cpUpload,*/ updateBanner);
        app.delete('/api/deleteBanner/:id', deleteBanner);
};
