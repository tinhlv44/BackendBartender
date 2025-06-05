const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag.controller");

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Lấy danh sách tất cả thẻ
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Danh sách thẻ
 */
router.get("/", tagController.getTags);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Tạo thẻ mới
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thẻ thành công
 */
router.post("/", tagController.createTag);

module.exports = router;
