const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_KEY = process.env.JWT_SECRET;
const Admin = require("../models/admin.model");

// Trang login
exports.getLoginPage = (req, res) => {
  res.render("login", { layout: false, error: null });
};

// Xử lý đăng nhập
exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ email: username });
  if (!admin) {
    return res.render("login", {
      layout: false,
      error: "Invalid username or password",
    });
  }
  const isMatch = await bcrypt.compare(password, admin.password);
  if (isMatch) {
    // Tạo JWT token
    const token = jwt.sign(
      { username: admin.username, role: admin.role },
      JWT_KEY,
      { expiresIn: "1h" }
    );

    // Lưu token vào cookie (hoặc localStorage phía client)
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/admin");
  } else {
    // Sai thông tin đăng nhập
    res.render("login", {
      layout: false,
      error: "Invalid username or password",
    });
  }
};
