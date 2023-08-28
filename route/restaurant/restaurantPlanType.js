const express = require('express');
const router = express.Router();

const { restaurantAuthMiddleware } = require('../../middleware/jwt');
const {getAllPlanType,getPlanTypeById,plantypeCreated,updatePlanType,deleteplantype} = require('../../controller/restaurant/restaurantPlanType');
const {getAllPlanTypeByAdmin} = require('../../controller/admin/adminPlanType');
const {getAllPlanTypeByUser,getPlanTypeByIdByUser} = require('../../controller/user/userPlanType');

//ADMIN
router.route('/admin/getAllPlanTypeByAdmin').get(getAllPlanTypeByAdmin)
// router.route('/createPlanType').post(createPlanType)
// router.route('/admin/getPlanTypeById/:id').get(/*adminAuthMiddleware,*/ getPlanTypeById)


//RESTAURANT
router.route('/restaurant/getAllPlanType').get(getAllPlanType)
router.route('/restaurant/getPlanTypeById/:id').get(/*restaurantAuthMiddleware,*/ getPlanTypeById)
router.route('/restaurant/plantypeCreated').post(/*restaurantAuthMiddleware,*/plantypeCreated)
router.route('/restaurant/updatePlanType/:id').patch(/*restaurantAuthMiddleware, */updatePlanType)
router.route('/restaurant/deleteplantype/:id').delete(deleteplantype)

//USER
router.route('/user/getAllPlanTypeByUser').get(getAllPlanTypeByUser)
router.route('/user/getPlanTypeByIdByUser/:id').get(/*adminAuthMiddleware,*/ getPlanTypeByIdByUser)


//router.route('/admin/privacy-policy').post(adminAuthMiddleware, addPrivacyPolicyByAdmin).get(adminAuthMiddleware, getPrivacyPolicyByAdmin).patch(adminAuthMiddleware, editPrivacyPolicyByAdmin);

module.exports = router;
