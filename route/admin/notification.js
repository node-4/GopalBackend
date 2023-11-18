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
module.exports = (app) => {
  app.post('/api/sendNotificationsByAdmin', sendNotificationsByAdmin);
  app.get('/api/getallNotifications', getallNotifications);
  app.get('/api/getnotificationsById/:id', getnotificationsById);
  app.put('/api/updateNotification/:id', updateNotification);
  app.delete('/api/deleteNotification/:id', deleteNotification);
};
