const adminAuth = require('../../middleware/jwt');
const { sendNotificationsByAdmin, getallNotifications, getnotificationsById, updateNotification, deleteNotification, } = require("../../controller/admin/notification");
module.exports = (app) => {
  app.post('/api/sendNotificationsByAdmin', sendNotificationsByAdmin);
  app.get('/api/getallNotifications', getallNotifications);
  app.get('/api/getnotificationsById/:id', getnotificationsById);
  app.put('/api/updateNotification/:id', updateNotification);
  app.delete('/api/deleteNotification/:id', deleteNotification);
};
