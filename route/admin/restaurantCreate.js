const express = require("express");
const router = express.Router();
const {
  registerRestaurant,
  restaurantLogin,
  updateLocationOfRestaurant,
  me,
  updateMeRestaurant,
  deleteByRestaurant,
} = require("../../controller/admin/restaurantCreate");
const { restaurantAuthMiddleware } = require("../../middleware/jwt");

router.route("/restaurant/register1").post(registerRestaurant);
router.route("/restaurant/login").post(restaurantLogin);
router
  .route("/updateLocationOfRestaurant")
  .put(restaurantAuthMiddleware, updateLocationOfRestaurant);
router.route("/restaurant/me").get(restaurantAuthMiddleware, me);
router
  .route("/updateMeRestaurant")
  .put(restaurantAuthMiddleware, updateMeRestaurant);
router
  .route("/deleteByRestaurant/:categoryId")
  .delete(/*restaurantAuthMiddleware,*/ deleteByRestaurant);

module.exports = router;
