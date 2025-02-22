const Post = require("../models/post.model");
const mongoose = require("mongoose");

// Helper function kiểm tra ID hợp lệ
const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Lấy tất cả bài viết
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy chi tiết một bài viết
exports.getPost = async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Tạo bài viết mới
exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Dữ liệu không hợp lệ", errors: error.errors });
    }
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Cập nhật bài viết
exports.updatePost = async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }
    res.status(200).json(post);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Dữ liệu không hợp lệ", errors: error.errors });
    }
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa bài viết
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }
    res.status(200).json({ message: "Xóa bài viết thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
// Lấy bài viết theo userID
exports.getPostsByUser = async (req, res) => {
  const { userID } = req.params;
  if (!validateObjectId(userID)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  try {
    const posts = await Post.find({ userID });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy bài viết theo tags
exports.getPostsByTags = async (req, res) => {
  const { tags } = req.query; // tags=tag1,tag2,tag3
  if (!tags) {
    return res
      .status(400)
      .json({ message: "Vui lòng cung cấp ít nhất một tag" });
  }
  const tagArray = tags.split(",");
  try {
    const posts = await Post.find({ tags: { $in: tagArray } });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
