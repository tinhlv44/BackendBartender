const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the post title"],
    },

    content: {
      type: String,
      required: [true, "Please enter the post content"],
    },

    images: [
      {
        type: String, // URL của hình ảnh
        required: false,
      },
    ],

    author: {
      type: mongoose.Schema.Types.ObjectId, // Liên kết tới người dùng tạo bài đăng
      ref: "User", // Tên model User
      required: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId, // Người dùng đã thích bài đăng
        ref: "User",
      },
    ],

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId, // Người bình luận
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          required: [true, "Comment content is required"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    status: {
      type: String,
      enum: ["published", "draft", "archived"], // Trạng thái bài đăng
      default: "published",
    },

    tags: [
      {
        type: String, // Tag liên quan đến bài đăng
      },
    ],

    views: {
      type: Number, // Số lượt xem bài đăng
      default: 0,
    },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"], // Các trạng thái kiểm duyệt
      default: "pending", // Mặc định là đang chờ duyệt
    },
    rejectionReason: {
      type: String, // Lý do bị từ chối, nếu có
      required: false,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
