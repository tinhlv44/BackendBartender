const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(403).render("403", {
      title: "Access Denied",
      layout: false,
      message: "You do not have permission to access this page.",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.user = decoded; // Lưu thông tin người dùng vào req.user
    next();
  } catch (err) {
    res.status(404).render("404", {
      title: "Page Not Found",
      layout: false,
      message: "Oops! The page you're looking for does not exist.",
    });
  }
};
