const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const swaggerDocs = require("./config/swagger");

const multer = require("multer");
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
const authRoute = require("./routes/auth.routes");
const bannerRoute = require("./routes/banner.router");
const categoryRoute = require("./routes/category.route");
const followRoute = require("./routes/follow.route");
const notificationRoute = require("./routes/notification.route");
const tagRoute = require("./routes/tag.route");
const recipeRoute = require("./routes/recipe.routes");
// Authenticate
const authenticateToken = require("./middleware/authenticateToken");

// Khởi tạo ứng dụng Express
const app = express();

// Lấy cổng và URI từ environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Set up EJS làm view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Sử dụng express-ejs-layouts để quản lý layout
app.use(ejsLayouts);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Cung cấp các tệp tĩnh (ví dụ: style.css)
app.use(bodyParser.json());
app.use(cookieParser()); // Để đọc cookie

// // Cấu hình Multer
// const storageMulter = multer.memoryStorage();
// const upload = multer({ storage: storageMulter });

// Cấu hình thư mục chứa layout
app.set("layout", "layouts/main");

// Định nghĩa các route
// Api
//User
app.use("/api/user", userRoute);
// Products
app.use("/api/products", productRoute);
// Post
app.use("/api/posts", postRoute);
// Banner
app.use("/api/banner", bannerRoute);
//Category
app.use("/api/category", categoryRoute);
//Follow
app.use("/api/follow", followRoute);
//notification
app.use("/api/notifications", notificationRoute);
//tag
app.use("/api/tag", tagRoute);
//recipe
app.use("/api/recipe", recipeRoute);

// Admin
app.use("/admin", authenticateToken, moderateRoute);
app.use("/", authRoute);

// Route chính - trang chủ
app.get("/admin", authenticateToken, (req, res) => {
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
// Api doc
// Kích hoạt Swagger UI
swaggerDocs(app);
// Kết nối với MongoDB và start server
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Tài liệu API: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((e) => {
    console.log("Connection failed!" + e);
  });
