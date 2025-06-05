const express = require("express");
const router = express.Router();
const analysisController = require("../controllers/analysis.controller");

// Hiển thị trang analysis
router.get("/", analysisController.getAnalysis);

module.exports = router;
