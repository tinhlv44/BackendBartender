const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} = require("../controllers/user.controller");
const authMiddleware = require("../middleware/userAuthToken");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API về Người dùng
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng cần lấy thông tin
 *       - name: includePosts
 *         in: query
 *         schema:
 *           type: boolean
 *         description: Nếu `true`, trả về cả danh sách bài viết của user
 *       - name: Authorization
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT để xác thực người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - fullName
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 example: "bartender123"
 *               password:
 *                 type: string
 *                 example: "P@ssw0rd"
 *               fullName:
 *                 type: string
 *                 example: "Nguyễn Văn A"
 *               email:
 *                 type: string
 *                 example: "bartender@example.com"
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Email đã tồn tại
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "bartender@example.com"
 *               password:
 *                 type: string
 *                 example: "P@ssw0rd"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Sai mật khẩu
 *       404:
 *         description: Tài khoản không tồn tại
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Lấy thông tin người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về thông tin người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   example: "650a6f2b1f1b3c001f7d4e91"
 *                 username:
 *                   type: string
 *                   example: "bartender123"
 *                 fullName:
 *                   type: string
 *                   example: "Nguyễn Văn A"
 *                 email:
 *                   type: string
 *                   example: "bartender@example.com"
 *                 avatarURL:
 *                   type: string
 *                   example: "https://example.com/avatar.jpg"
 *       401:
 *         description: Không có token
 */
router.get("/profile", authMiddleware, getUserProfile);

/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Nguyễn Văn B"
 *               bio:
 *                 type: string
 *                 example: "Bartender chuyên nghiệp với 5 năm kinh nghiệm"
 *               avatarURL:
 *                 type: string
 *                 example: "https://example.com/avatar-new.jpg"
 *               socialLinks:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://facebook.com/bartender", "https://instagram.com/bartender"]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       401:
 *         description: Không có quyền truy cập
 */
router.put("/profile", authMiddleware, updateUserProfile);

/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng có phân trang
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng user mỗi trang
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Trang hiện tại
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   example: 100
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: string
 *                         example: "650a6f2b1f1b3c001f7d4e91"
 *                       username:
 *                         type: string
 *                         example: "bartender123"
 *                       fullName:
 *                         type: string
 *                         example: "Nguyễn Văn A"
 *                       email:
 *                         type: string
 *                         example: "bartender@example.com"
 *       401:
 *         description: Không có quyền truy cập
 */
router.get("/all", getAllUsers);

module.exports = router;
