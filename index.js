const express = require("express");
const mongoose = require("mongoose");
//MOdel
const User = require("./models/user.model.js");
const Product = require("./models/product.model.js");
const Post = require("./models/post.model.js");
//Router
const userRoute = require("./routes/user.router.js");
const productRoute = require("./routes/product.route.js");
const postRoute = require("./routes/post.route.js");

const moderateRoute = require("./routes/moderation.routes.js");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((e) => {
    console.log("Connection failed!" + e);
  });
// Set up EJS as the view engine
app.set("view engine", "ejs");
// middleware
app.use(express.json());

app.use(express.static("public")); //this will helps to use style.css file
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/post", postRoute);
app.use("/", moderateRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});
// app.get("/moderate", async (req, res) => {
//   const posts = await Post.find({});
//   res.render("moderation", { posts });
// });
// app.get("/about", (req, res) => {
//   console.log("req made on" + req.url);
//   res.render("about", { title: "About" });
// });
// Sử dụng các biến từ .env
