const mongoose = require("mongoose");

const notificationAdminSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NotificationAdmin", notificationAdminSchema);
