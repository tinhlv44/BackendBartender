const mongoose = require("mongoose");
const Post = require("./post.model");
const Recipe = require("./recipe.model");

const commentSchema = new mongoose.Schema(
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
    targetID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    targetType: {
      type: String,
      enum: ["post", "recipe"],
      required: true,
    },
    parentCommentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 🟢 Middleware: Khi thêm comment -> Cập nhật `comments_count`
commentSchema.post("save", async function (doc) {
  const model = doc.targetType === "post" ? Post : Recipe;
  await model.findByIdAndUpdate(doc.targetID, { $inc: { commentsCount: 1 } });
});

// 🔴 Middleware: Khi xóa comment -> Giảm `comments_count`
commentSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return; // Nếu comment không tồn tại
  const model = doc.targetType === "post" ? Post : Recipe;
  await model.findByIdAndUpdate(doc.targetID, { $inc: { commentsCount: -1 } });
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      requied:
 *        - userID
 *        - content
 *        - targetID
 *        - targetType
 *      properties:
 *        _id:
 *           type: string
 *           description: ID của bài viết (được tạo tự động bởi MongoDB)
 *           example: "65d4e4f10f8a3c1a2b4e9d8f"
 *        userID:
 *           type: string
 *           description: ID người viết bài (phải thuộc bảng User)
 *           example: "65d4e4f10f8a3c1a2b4e9d8f"
 *        content:
 *           type: string
 *           description: Nội dung bình luận
 *           example: "Tuyệt vời!"
 *        targetID:
 *           type: string
 *           description: ID của bài Post HOẶC Recipe (phải thuộc các bảng)
 *           example: "65d4e4f10f8a3c1a2b4e9d8f"
 *        targetType:
 *           type: string
 *           description: Loại bình luận
 *           enum: ["post", "recipe"]
 *           example: "post"
 *        likesCount:
 *           type : number
 *           description: Số lướng thích bình luận
 *           default: 0
 *           example: 5
 *
 */
