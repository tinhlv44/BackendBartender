// controllers/moderation.controller.js

const Post = require("../models/post.model");

// Lấy các bài đăng đang chờ duyệt
async function getPendingPosts(req, res) {
  try {
    const posts = await Post.find({ approvalStatus: "pending" })
      .populate("author", "name") // Dùng populate để lấy tên người đăng
      .exec();

    res.render("moderation", { posts, status: "pending" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts");
  }
}

// Lấy các bài đăng đã duyệt
async function getApprovedPosts(req, res) {
  try {
    const posts = await Post.find({ approvalStatus: "approved" })
      .populate("author", "name") // Dùng populate để lấy tên người đăng
      .exec();

    res.render("moderation", { posts, status: "approved" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts");
  }
}

// Lấy các bài đăng đã từ chối
async function getRejectedPosts(req, res) {
  try {
    const posts = await Post.find({ approvalStatus: "rejected" })
      .populate("author", "name") // Dùng populate để lấy tên người đăng
      .exec();

    res.render("moderation", { posts, status: "rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts");
  }
}

// Duyệt bài đăng
async function approvePost(req, res) {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    post.approvalStatus = "approved";
    await post.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Từ chối bài đăng
async function rejectPost(req, res) {
  const postId = req.params.id;
  const { reason } = req.body;

  try {
    const post = await Post.findById(postId);
    post.approvalStatus = "rejected";
    post.rejectionReason = reason;
    await post.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  getPendingPosts,
  getApprovedPosts,
  getRejectedPosts,
  approvePost,
  rejectPost,
};
