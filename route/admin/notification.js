const express = require("express");
const {
  sendNotificationsByAdmin,
  getallNotifications,
  getnotificationsById,
  updateNotification,
  deleteNotification,
} = require("../../controller/admin/notification");
// const { getnotificationsByIdByUser,getallNotificationsByUser} = require('../controller/user/pushnotification')
// const { getnotificationsByIdByVendor,getallnotificationsByVendor} = require('../controller/vendor/pushnotification')
const notificationRouter = express();

//ADMIN
notificationRouter.post("/sendNotificationsByAdmin", sendNotificationsByAdmin);
notificationRouter.get("/getallNotifications", getallNotifications);
notificationRouter.get("/getnotificationsById/:id", getnotificationsById);
notificationRouter.put("/updateNotification/:id", updateNotification);
notificationRouter.delete("/deleteNotification/:id", deleteNotification);

module.exports = notificationRouter;
