// routes/moderation.routes.js

const express = require("express");
const router = express.Router();
const moderationController = require("../controllers/moderation.controller");

// Route để lấy các bài đăng đang chờ duyệt
router.get("/moderate", moderationController.getPendingPosts);

// Route để duyệt bài đăng
router.post("/moderate/approve/:id", moderationController.approvePost);

// Route để từ chối bài đăng
router.post("/moderate/reject/:id", moderationController.rejectPost);

module.exports = router;
