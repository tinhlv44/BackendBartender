const Banner = require("../models/banner.model");
const fun = require("../helper/fun");
const mongoose = require("mongoose");

// Lấy danh sách tất cả các banner
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Lấy một banner theo ID
exports.getBannerById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Không tìm thấy banner" });
    }
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Thêm một banner mới
exports.createBanner = async (req, res) => {
  const { title, image, description, targetID, targetType } = req.body;
  const newBanner = new Banner({
    title,
    image,
    description,
    targetID,
    targetType,
  });
  newBanner
    .save()
    .then((banner) =>
      res.status(201).json({ message: "Banner created", banner })
    )
    .catch((error) => {
      const validationError = fun.handleValidationError(error);
      if (validationError) {
        return res.status(400).json(validationError);
      }

      res.status(500).json({ message: "Internal Server Error", error });
    });
};

// Cập nhật banner theo ID
exports.updateBanner = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBanner) {
      return res.status(404).json({ message: "Không tìm thấy banner" });
    }
    res.status(200).json(updatedBanner);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Xóa banner theo ID
exports.deleteBanner = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  try {
    const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
    if (!deletedBanner) {
      return res.status(404).json({ message: "Không tìm thấy banner" });
    }
    res.status(200).json({ message: "Xóa banner thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};
