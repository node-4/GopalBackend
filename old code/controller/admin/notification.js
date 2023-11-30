const path = require("path");
require("dotenv").config();

const Notification = require("../../model/notificationModel");

exports.sendNotificationsByAdmin = async (req, res) => {
  try {
    const data = {
        message: req.body.message,
         };

    const notifictiontouser = await Notification.create(data);
    return res.status(200).send({ msg: notifictiontouser });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

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
