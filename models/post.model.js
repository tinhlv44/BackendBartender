const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    imagePosts: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    visibility: {
      type: String,
      enum: ["public", "private", "friends"],
      default: "public",
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - userID
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của bài viết (được tạo tự động bởi MongoDB)
 *           example: "65d4e4f10f8a3c1a2b4e9d8f"
 *         userID:
 *           type: string
 *           description: ID của người dùng tạo bài viết
 *           example: "65d4e4f10f8a3c1a2b4e9d8e"
 *         content:
 *           type: string
 *           description: Nội dung bài viết
 *           example: "Hôm nay thật là một ngày tuyệt vời!"
 *         imagePosts:
 *           type: array
 *           description: Danh sách URL hình ảnh của bài viết
 *           items:
 *             type: string
 *           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *         tags:
 *           type: array
 *           description: Danh sách thẻ liên quan đến bài viết
 *           items:
 *             type: string
 *           example: ["travel", "food", "lifestyle"]
 *         visibility:
 *           type: string
 *           description: Mức độ hiển thị của bài viết
 *           enum: ["public", "private", "friends"]
 *           example: "public"
 *         commentsCount:
 *           type: number
 *           description: Số lượng bình luận của bài viết
 *           example: 10
 *         likesCount:
 *           type: number
 *           description: Số lượt thích của bài viết
 *           example: 100
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo bài viết
 *           example: "2024-02-26T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian cập nhật bài viết gần nhất
 *           example: "2024-02-26T12:30:00Z"
 */
