const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();
require("dotenv").config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});
// Sử dụng các biến từ .env
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

//   const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
// const { storage } = require("./firebase");

// // Hàm upload ảnh
// const uploadImage = async (file) => {
//   try {
//     const storageRef = ref(storage, `images/${file.originalname}`);
//     const snapshot = await uploadBytes(storageRef, file.buffer);
//     const downloadURL = await getDownloadURL(snapshot.ref);
//     return downloadURL; // URL của ảnh
//   } catch (error) {
//     console.error("Lỗi upload ảnh:", error);
//     throw error;
//   }
// };

// // Ví dụ: Gọi hàm upload
// const multer = require("multer");
// const upload = multer();

// app.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     const downloadURL = await uploadImage(req.file);
//     res.status(200).json({ url: downloadURL });
//   } catch (error) {
//     res.status(500).send("Lỗi upload ảnh");
//   }
// });
