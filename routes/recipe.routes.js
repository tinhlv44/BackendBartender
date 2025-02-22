const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe.controller");

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: API quản lý công thức pha chế
 */

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Lấy danh sách công thức
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Tên thể loại cần lọc
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [Dễ, Trung bình, Khó]
 *         description: Lọc theo độ khó
 *       - in: query
 *         name: isPremium
 *         schema:
 *           type: boolean
 *         description: Lọc theo công thức premium hay không
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách công thức
 *       500:
 *         description: Lỗi máy chủ
 */
router.get("/", recipeController.getAllRecipes);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Lấy công thức theo ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID công thức
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin công thức
 *       404:
 *         description: Không tìm thấy công thức
 *       500:
 *         description: Lỗi máy chủ
 */
router.get("/:id", recipeController.getRecipeById);

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Tạo mới công thức
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeName:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *               imageURL:
 *                 type: string
 *               description:
 *                 type: string
 *               isPremiumRecipe:
 *                 type: boolean
 *               createdBy:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [Dễ, Trung bình, Khó]
 *     responses:
 *       201:
 *         description: Công thức đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi máy chủ
 */
router.post("/", recipeController.createRecipe);

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Cập nhật công thức theo ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID công thức
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeName:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *               imageURL:
 *                 type: string
 *               description:
 *                 type: string
 *               isPremiumRecipe:
 *                 type: boolean
 *               difficulty:
 *                 type: string
 *                 enum: [Dễ, Trung bình, Khó]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy công thức
 *       500:
 *         description: Lỗi máy chủ
 */
router.put("/:id", recipeController.updateRecipe);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Xóa công thức theo ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID công thức
 *     responses:
 *       200:
 *         description: Xóa công thức thành công
 *       404:
 *         description: Không tìm thấy công thức
 *       500:
 *         description: Lỗi máy chủ
 */
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
