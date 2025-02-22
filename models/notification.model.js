const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    notificationID: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "ID người nhận thông báo là bắt buộc"],
      ref: "User",
    },
    message: {
      type: String,
      required: [true, "Nội dung thông báo không được để trống"],
      trim: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    read_status: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["like", "comment", "follow", "system"],
      required: [true, "Loại thông báo là bắt buộc"],
    },
    relatedID: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
