const mongoose = require("mongoose");
const Post = require("./post.model");
const Recipe = require("./recipe.model");
const Comment = require("./comment.model");

const likeSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    targetType: {
      type: String,
      enum: ["post", "recipe", "comment"],
      required: true,
    },
  },
  { timestamps: true }
);

// 🟢 Middleware: Khi thêm like -> Tăng `likes_count`
likeSchema.post("save", async function (doc) {
  const model =
    doc.targetType === "post"
      ? Post
      : doc.targetType === "recipe"
      ? Recipe
      : Comment;
  await model.findByIdAndUpdate(doc.targetID, { $inc: { likesCount: 1 } });
});

// 🔴 Middleware: Khi xóa like -> Giảm `likes_count`
likeSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;
  const model =
    doc.targetType === "post"
      ? Post
      : doc.targetType === "recipe"
      ? Recipe
      : Comment;
  await model.findByIdAndUpdate(doc.targetID, { $inc: { likesCount: -1 } });
});

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;

/**
 * @swagger
 * components:
 *  schemas:
 *    Like:
 *      type: object
 *      required:
 *        - userID
 *        - targetID
 *        - targetType
 *      properties:
 *        _id:
 *           type: string
 *           description: ID của lượt thích (tự động tạo bởi MongoDB)
 *           example: "65d4e4f10f8a3c1a2b4e9d8f"
 *        userID:
 *           type: string
 *           description: ID người dùng đã like
 *           example: "65d4e4f10f8a3c1a2b4e9d8f"
 *        targetID:
 *           type: string
 *           description: ID của Post, Recipe hoặc Comment
 *           example: "65d4e4f10f8a3c1a2b4e9d8f"
 *        targetType:
 *           type: string
 *           description: Loại nội dung được like
 *           enum: ["post", "recipe", "comment"]
 *           example: "post"
 */
