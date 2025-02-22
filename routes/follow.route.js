const express = require("express");
const router = express.Router();
const followController = require("../controllers/follow.controller");

/**
 * @swagger
 * /api/follow/followers/{userID}:
 *   get:
 *     summary: Lấy danh sách người theo dõi
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Danh sách người theo dõi
 */
router.get("/followers/:userID", followController.getFollowers);

/**
 * @swagger
 * /api/follow/following/{userID}:
 *   get:
 *     summary: Lấy danh sách người mà user đang theo dõi
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Danh sách người theo dõi
 *       500:
 *         description: Lỗi server
 */
router.get("/following/:userID", followController.getFollowing);

/**
 * @swagger
 * /api/follow:
 *   post:
 *     summary: Theo dõi người dùng
 *     tags: [Follow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               followingUserID:
 *                 type: string
 *     responses:
 *       201:
 *         description: Theo dõi thành công
 */
router.post("/", followController.followUser);

/**
 * @swagger
 * /api/follow:
 *   delete:
 *     summary: Hủy theo dõi người dùng
 *     tags: [Follow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               followingUserID:
 *                 type: string
 *     responses:
 *       201:
 *         description: Hủy theo dõi thành công
 */
router.delete("/", followController.unfollowUser);

module.exports = router;
