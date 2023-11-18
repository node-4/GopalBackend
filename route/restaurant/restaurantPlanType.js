const express = require('express');
const router = express.Router();

const { restaurantAuthMiddleware } = require('../../middleware/jwt');
const { getAllPlanType, getPlanTypeById, plantypeCreated, updatePlanType, deleteplantype } = require('../../controller/restaurant/restaurantPlanType');
const { getAllPlanTypeByAdmin } = require('../../controller/admin/adminPlanType');
const { getAllPlanTypeByUser, getPlanTypeByIdByUser } = require('../../controller/user/userPlanType');
module.exports = (app) => {
        // ADMIN PLAN TYPES
        app.get('/api/admin/getAllPlanTypeByAdmin', getAllPlanTypeByAdmin);
        // app.post('/api/createPlanType', createPlanType);
        // app.get('/api/admin/getPlanTypeById/:id', /*adminAuthMiddleware,*/ getPlanTypeById);

        // RESTAURANT PLAN TYPES
        app.get('/api/restaurant/getAllPlanType', getAllPlanType);
        app.get('/api/restaurant/getPlanTypeById/:id', /*restaurantAuthMiddleware,*/ getPlanTypeById);
        app.post('/api/restaurant/plantypeCreated', /*restaurantAuthMiddleware,*/ plantypeCreated);
        app.patch('/api/restaurant/updatePlanType/:id', /*restaurantAuthMiddleware, */ updatePlanType);
        app.delete('/api/restaurant/deleteplantype/:id', deleteplantype);

        // USER PLAN TYPES
        app.get('/api/user/getAllPlanTypeByUser', getAllPlanTypeByUser);
        app.get('/api/user/getPlanTypeByIdByUser/:id', /*adminAuthMiddleware,*/ getPlanTypeByIdByUser);

        // Privacy Policy (Uncomment if needed)
        // app.post('/api/admin/privacy-policy', adminAuthMiddleware, addPrivacyPolicyByAdmin);
        // app.get('/api/admin/privacy-policy', adminAuthMiddleware, getPrivacyPolicyByAdmin);
        // app.patch('/api/admin/privacy-policy', adminAuthMiddleware, editPrivacyPolicyByAdmin);
};
