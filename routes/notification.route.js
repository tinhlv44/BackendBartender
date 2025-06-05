const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API quản lý thông báo
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Lấy tất cả thông báo
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Danh sách thông báo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */
router.get("/", notificationController.getAllNotifications);

/**
 * @swagger
 * /api/notifications/user/{userID}:
 *   get:
 *     summary: Lấy thông báo của một người dùng
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Danh sách thông báo của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */
router.get("/user/:userID", notificationController.getNotificationsByUser);

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Lấy thông báo theo ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thông báo
 *     responses:
 *       200:
 *         description: Chi tiết thông báo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Không tìm thấy thông báo
 */
router.get("/:id", notificationController.getNotificationById);

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Tạo mới thông báo
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: ID của người nhận thông báo
 *               message:
 *                 type: string
 *                 description: Nội dung thông báo
 *               type:
 *                 type: string
 *                 enum: ["like", "comment", "follow", "system"]
 *                 description: Loại thông báo
 *               relatedID:
 *                 type: string
 *                 description: ID liên quan (nếu có)
 *     responses:
 *       201:
 *         description: Tạo thông báo thành công
 */
router.post("/", notificationController.createNotification);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Đánh dấu thông báo đã đọc
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thông báo
 *     responses:
 *       200:
 *         description: Đã cập nhật trạng thái đọc
 *       404:
 *         description: Không tìm thấy thông báo
 */
router.patch("/:id/read", notificationController.markAsRead);

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Xóa thông báo
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thông báo
 *     responses:
 *       200:
 *         description: Xóa thông báo thành công
 *       404:
 *         description: Không tìm thấy thông báo
 */
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
