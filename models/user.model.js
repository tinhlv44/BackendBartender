const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       description: Thông tin của người dùng
 *       properties:
 *         username:
 *           type: string
 *           example: "nguyenvana"
 *           description: Tên đăng nhập của người dùng (duy nhất)
 *         passwordHash:
 *           type: string
 *           example: "$2a$10$abcdef123456"
 *           description: Mật khẩu đã được hash
 *         fullName:
 *           type: string
 *           example: "Nguyễn Văn A"
 *           description: Họ và tên của người dùng
 *         email:
 *           type: string
 *           format: email
 *           example: "nguyenvana@example.com"
 *           description: Email của người dùng (duy nhất)
 *         avatarURL:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 *           description: Đường dẫn ảnh đại diện của người dùng
 *         joinedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-02-26T14:30:00.000Z"
 *           description: Ngày tham gia hệ thống
 *         last_active:
 *           type: string
 *           format: date-time
 *           example: "2024-02-26T14:30:00.000Z"
 *           description: Thời gian hoạt động cuối cùng
 *         bio:
 *           type: string
 *           example: "Tôi là một lập trình viên"
 *           description: Tiểu sử của người dùng
 *         role:
 *           type: string
 *           enum: ["Member", "Partner"]
 *           example: "Member"
 *           description: Vai trò của người dùng trong hệ thống
 *         isPremium:
 *           type: boolean
 *           example: true
 *           description: Người dùng có phải thành viên Premium không
 *         premium_expiry_date:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T00:00:00.000Z"
 *           description: Ngày hết hạn của Premium
 *         socialLinks:
 *           type: array
 *           example: ["https://facebook.com/nguyenvana", "https://github.com/nguyenvana"]
 *           description: Danh sách link mạng xã hội
 *           items:
 *             type: string
 *         activity_status:
 *           type: boolean
 *           example: true
 *           description: Trạng thái hoạt động của người dùng
 *         last_active_date:
 *           type: string
 *           format: date-time
 *           example: "2024-02-26T14:30:00.000Z"
 *           description: Ngày hoạt động cuối cùng của người dùng
 */

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    avatarURL: { type: String, default: "" },
    joinedAt: { type: Date, default: Date.now },
    last_active: { type: Date, default: Date.now },
    bio: { type: String, default: "" },
    role: { type: String, enum: ["Member", "Partner"], default: "Member" },
    isPremium: { type: Boolean, default: false },
    premium_expiry_date: { type: Date, default: null },
    socialLinks: { type: [String], default: [] },
    activity_status: { type: Boolean, default: true },
    last_active_date: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
