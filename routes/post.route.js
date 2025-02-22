const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPostsByTags,
  getPostsByUser,
} = require("../controllers/post.controller.js");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API quản lý bài viết
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Lấy danh sách tất cả bài viết
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Trả về danh sách bài viết
 *       500:
 *         description: Lỗi server
 */
router.get("/", getPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Lấy chi tiết một bài viết
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết
 *     responses:
 *       200:
 *         description: Trả về thông tin bài viết
 *       404:
 *         description: Không tìm thấy bài viết
 *       500:
 *         description: Lỗi server
 */
router.get("/:id", getPost);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Tạo một bài viết mới
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: Tiêu đề bài viết
 *               content:
 *                 type: string
 *                 description: Nội dung bài viết
 *     responses:
 *       201:
 *         description: Bài viết đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post("/", createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Cập nhật bài viết theo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Tiêu đề mới của bài viết
 *               content:
 *                 type: string
 *                 description: Nội dung mới của bài viết
 *     responses:
 *       200:
 *         description: Bài viết đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy bài viết
 *       500:
 *         description: Lỗi server
 */
router.put("/:id", updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Xóa bài viết theo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết cần xóa
 *     responses:
 *       200:
 *         description: Xóa bài viết thành công
 *       404:
 *         description: Không tìm thấy bài viết
 *       500:
 *         description: Lỗi server
 */
router.delete("/:id", deletePost);
/**
 * @swagger
 * /api/posts/user/{userID}:
 *   get:
 *     summary: Lấy bài viết theo userID
 *     tags: [Posts]
 *     parameters:
 *       - name: userID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       400:
 *         description: ID không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.get("/user/:userID", getPostsByUser);

/**
 * @swagger
 * /api/posts/tags:
 *   get:
 *     summary: Lấy bài viết theo tags
 *     tags: [Posts]
 *     parameters:
 *       - name: tags
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Danh sách tags cách nhau bằng dấu phẩy (tag1,tag2,...)
 *     responses:
 *       200:
 *         description: Thành công
 *       400:
 *         description: Vui lòng cung cấp ít nhất một tag
 *       500:
 *         description: Lỗi server
 */
router.get("/tags", getPostsByTags);

module.exports = router;
