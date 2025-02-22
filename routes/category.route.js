const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API quản lý Danh mục Category
 */
/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Lấy danh sách tất cả danh mục
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Danh sách danh mục
 */
router.get("/", categoryController.getAllCategories);

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Lấy một danh mục theo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin danh mục
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.get("/:id", categoryController.getCategoryById);

/**
 * @swagger
 * /api/category:
 *   post:
 *     tags: [Categories]
 *     summary: Thêm một danh mục mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameCategory:
 *                 type: string
 *                 example: "Phim hành động"
 *     responses:
 *       201:
 *         description: Tạo danh mục thành công
 *       400:
 *         description: Lỗi đầu vào
 */
router.post("/", categoryController.createCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Cập nhật danh mục theo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameCategory:
 *                 type: string
 *                 example: "Phim hài"
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.put("/:id", categoryController.updateCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Xóa danh mục theo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
