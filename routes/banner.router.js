const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/banner.controller");

/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: API quản lý Banner
 */

/**
 * @swagger
 * /api/banner/:
 *   get:
 *     summary: Lấy danh sách tất cả các banner
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: Thành công
 *       500:
 *         description: Lỗi server
 */
router.get("/", bannerController.getAllBanners);

/**
 * @swagger
 * /api/banner/{id}:
 *   get:
 *     summary: Lấy chi tiết một banner
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của banner cần lấy
 *     responses:
 *       200:
 *         description: Thành công
 *       400:
 *         description: ID không hợp lệ
 *       404:
 *         description: Không tìm thấy banner
 */
router.get("/:id", bannerController.getBannerById);

/**
 * @swagger
 * /api/banner/:
 *   post:
 *     summary: Tạo mới một banner
 *     tags: [Banners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Khuyến mãi tháng này"
 *               image:
 *                 type: string
 *                 example: "https://example.com/banner.png"
 *               description:
 *                 type: string
 *                 example: "Giảm giá 50% khi đặt hàng online"
 *               targetID:
 *                 type: string
 *                 example: "650a6f2b1f1b3c001f7d4e92"
 *               targetType:
 *                 type: string
 *                 enum: ["post", "recipe"]
 *                 example: "post"
 *     responses:
 *       201:
 *         description: Banner được tạo thành công
 *       400:
 *         description: Cú pháp sai, thiếu trường dữ liệu hoặc không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post("/", bannerController.createBanner);

/**
 * @swagger
 * /api/banner/{id}:
 *   put:
 *     summary: Cập nhật banner
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của banner cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               targetID:
 *                 type: string
 *               targetType:
 *                 type: string
 *                 enum: ["post", "recipe"]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: ID không hợp lệ
 *       404:
 *         description: Không tìm thấy banner
 */
router.put("/:id", bannerController.updateBanner);

/**
 * @swagger
 * /api/banner/{id}:
 *   delete:
 *     summary: Xóa banner
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của banner cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       400:
 *         description: ID không hợp lệ
 *       404:
 *         description: Không tìm thấy banner
 */
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
