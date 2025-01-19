const Post = require("../models/post.model");
const User = require("../models/user.model");

async function getPendingPosts(req, res) {
  try {
    const posts = await Post.find({ approvalStatus: "pending" })
      .populate("author", "name") // Populate tên người đăng từ User
      .exec();

    res.render("moderation", { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts");
  }
}

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

module.exports = { getPendingPosts, approvePost, rejectPost };
