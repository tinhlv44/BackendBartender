const Follow = require("../models/follow.model");

// Lấy danh sách người theo dõi
exports.getFollowers = async (req, res) => {
  try {
    const followers = await Follow.find({ followingUserID: req.params.userID });
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy danh sách người mà user đang theo dõi
exports.getFollowing = async (req, res) => {
  try {
    const following = await Follow.find({ userID: req.params.userID });
    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Thêm theo dõi
exports.followUser = async (req, res) => {
  try {
    const { userID, followingUserID } = req.body;
    if (!userID || !followingUserID) {
      return res.status(400).json({ message: "Thiếu dữ liệu bắt buộc" });
    }
    const newFollow = new Follow({ userID, followingUserID });
    await newFollow.save();
    res.status(201).json(newFollow);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Hủy theo dõi
exports.unfollowUser = async (req, res) => {
  try {
    const { userID, followingUserID } = req.body;
    const follow = await Follow.findOneAndDelete({ userID, followingUserID });
    if (!follow) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy dữ liệu theo dõi" });
    }
    res.status(200).json({ message: "Hủy theo dõi thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
