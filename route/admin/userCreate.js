const express = require('express');
const router = express.Router();
const {socialLoginAdmin ,addDetailsOfUserByadmin , saveCurrentLocationOfUserByAdmin ,getCurrentUserOfUserByAdmin , editCurrentUserByAdmin ,deleteUserByAdmin} = require('../../controller/admin/userCreate');
const {userAuthMiddleware} = require('../../middleware/jwt')

router.route('/addDetailsOfUserByadmin').put(userAuthMiddleware,addDetailsOfUserByadmin);
router.route('/socialLoginAdmin').post(socialLoginAdmin);
router.route('/saveCurrentLocationOfUserByAdmin').put(userAuthMiddleware,saveCurrentLocationOfUserByAdmin );
router.route('/getCurrentUserOfUserByAdmin').get(userAuthMiddleware,getCurrentUserOfUserByAdmin);
router.route('/editCurrentUserByAdmin').put(userAuthMiddleware,editCurrentUserByAdmin)
router.route('/deleteUserByAdmin/:categoryId').delete(/*restaurantAuthMiddleware,*/deleteUserByAdmin)


module.exports = router;
