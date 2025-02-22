require("dotenv").config(); // Để sử dụng biến môi trường nếu cần
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/admin.model"); // Đường dẫn tới model Admin của bạn
const email = process.env.EMAIL_ADMIN;
const password = process.env.PASSWORD_ADMIN;

// Kết nối tới cơ sở dữ liệu
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối cơ sở dữ liệu thành công!");
  } catch (error) {
    console.error("Lỗi kết nối cơ sở dữ liệu:", error.message);
    process.exit(1);
  }
};

// Khởi tạo tài khoản admin
const seedAdmin = async () => {
  try {
    // Kiểm tra nếu đã có admin
    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) {
      console.log("Tài khoản admin đã tồn tại!");
      return;
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo admin mới
    const newAdmin = new Admin({
      name: "Admin",
      email: email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    console.log("Tài khoản admin đã được tạo thành công!");
  } catch (error) {
    console.error("Lỗi khi tạo tài khoản admin:", error.message);
  } finally {
    mongoose.connection.close(); // Đóng kết nối sau khi thực hiện xong
  }
};

// Thực thi các bước
(async () => {
  await connectDB();
  await seedAdmin();
})();
