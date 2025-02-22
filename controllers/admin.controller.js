const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");

// Lấy tất cả quản trị viên
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy quản trị viên theo ID
const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin không tồn tại" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo mới một quản trị viên
const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Kiểm tra nếu email đã tồn tại
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Mã hóa mật khẩu trước khi lưu vào DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword, // Mật khẩu đã được mã hóa
      role,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thông tin quản trị viên
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin không tồn tại" });
    }

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa quản trị viên
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin không tồn tại" });
    }

    res.status(200).json({ message: "Admin đã bị xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kiểm tra mật khẩu và đăng nhập quản trị viên
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tìm admin bằng email
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin không tồn tại" });
    }

    // Kiểm tra mật khẩu đã mã hóa
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }

    // Nếu mật khẩu đúng, trả về thông tin admin (có thể thêm token nếu cần)
    res.status(200).json({ message: "Đăng nhập thành công", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
};
