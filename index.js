const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
require("dotenv").config();

// Model
const User = require("./models/user.model");
const Product = require("./models/product.model");
const Post = require("./models/post.model");

// Router
const userRoute = require("./routes/user.router");
const productRoute = require("./routes/product.route");
const postRoute = require("./routes/post.route");
const moderateRoute = require("./routes/moderation.routes");

// Khởi tạo ứng dụng Express
const app = express();

// Lấy cổng và URI từ environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Kết nối với MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Connection failed!" + e);
  });

// Set up EJS làm view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Sử dụng express-ejs-layouts để quản lý layout
app.use(ejsLayouts);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Cung cấp các tệp tĩnh (ví dụ: style.css)

// Cấu hình thư mục chứa layout
app.set("layout", "layouts/main");

// Định nghĩa các route
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/post", postRoute);
app.use("/", moderateRoute);

// Route chính - trang chủ
app.get("/", (req, res) => {
  const data = {
    title: "Admin Dashboard",
    stats: {
      users: 1200,
      sales: 45000,
      visits: 8900,
    },
  };
  res.render("index", data);
});
