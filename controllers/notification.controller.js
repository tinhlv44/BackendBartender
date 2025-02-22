const Notification = require("../models/notification.model");

// Lấy tất cả thông báo
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy thông báo" });
  }
};

// Lấy thông báo theo userID
exports.getNotificationsByUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const notifications = await Notification.find({ userID }).sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy thông báo của người dùng" });
  }
};

// Lấy thông báo theo ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: "Không tìm thấy thông báo" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy thông báo" });
  }
};

// Tạo mới thông báo
exports.createNotification = async (req, res) => {
  try {
    const { userID, message, type, relatedID } = req.body;
    const notification = new Notification({ userID, message, type, relatedID });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Đánh dấu thông báo là đã đọc
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read_status: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ error: "Không tìm thấy thông báo" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật trạng thái đọc" });
  }
};

// Xóa thông báo
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: "Không tìm thấy thông báo" });
    }
    res.status(200).json({ message: "Xóa thông báo thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa thông báo" });
  }
};
