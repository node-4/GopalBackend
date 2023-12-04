const Notification = require("../../model/notification");
const User = require("../../model/userCreate");

exports.sendNotificationsByAdmin = async (req, res) => {
  try {
    if (req.body.total == "ALL") {
      let userData = await User.find({ role: req.body.sendTo });
      if (userData.length == 0) {
        return res.status(404).json({ status: 404, message: "User not found" });
      } else {
        for (let i = 0; i < userData.length; i++) {
          let obj = {
            receiverUser: userData[i]._id,
            body: req.body.body,
          }
          await Notification.create(obj)
        }
        return res.status(200).json({ status: 200, message: "Notification send successfully." });
      }
    }
    if (req.body.total == "SINGLE") {
      let userData = await User.findById({ _id: req.body._id, role: req.body.sendTo });
      if (!userData) {
        return res.status(404).json({ status: 404, message: "Employee not found" });
      } else {
        let obj = {
          receiverUser: req.body._id,
          body: req.body.body,
        }
        let data = await Notification.create(obj)
        if (data) {
          return res.status(200).json({ status: 200, message: "Notification send successfully.", data: data });
        }

      }
    }
  } catch (error) {
    console.log(error);
    return res.status(501).send({ status: 501, message: "server error.", data: {}, });
  }
}
exports.getallNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    if (!notifications || notifications.length === 0) {
      return res.status(400).json({
        message: "No notifications",
      });
    }
    return res.status(200).json({
      message: "notifications found",
      data: notifications,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
exports.getnotificationsById = async (req, res) => {
  try {
    const notifications = await Notification.find({ _id: req.params.id });
    if (!notifications || notifications.length === 0) {
      return res.status(400).json({
        message: "No notifications",
      });
    }
    return res.status(200).json({
      message: "notifications found",
      data: notifications,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
exports.updateNotification = async (req, res) => {
  try {
    const data = {
      message: req.body.message,
    };

    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id },
      data,
      { new: true }
    );
    if (!notification) {
      return res.status(400).json({
        message: "Notification not found",
      });
    }
    return res.status(200).json({
      message: "notification updated",
      data: notification,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
    });
    if (!notification) {
      return res.status(400).json({
        message: "Notification not found",
      });
    }
    return res.status(200).json({
      message: "notification deleted",
      data: notification,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
