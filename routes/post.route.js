const express = require("express");
const Post = require("../models/post.model.js");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller.js");

// Lấy tất cả bài đăng
router.get("/", getPosts);

// Lấy chi tiết một bài đăng theo ID
router.get("/:id", getPost);

// Tạo bài đăng mới
router.post("/", createPost);

// Cập nhật bài đăng theo ID
router.put("/:id", updatePost);

// Xóa bài đăng theo ID
router.delete("/:id", deletePost);

module.exports = router;
