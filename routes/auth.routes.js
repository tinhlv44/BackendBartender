const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Route hiển thị trang đăng nhập
router.get("/login", authController.getLoginPage);

// Route xử lý đăng nhập
router.post("/login", authController.postLogin);

module.exports = router;
