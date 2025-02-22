const mongoose = require("mongoose");
exports.handleValidationError = (error) => {
  if (error.name !== "ValidationError") return null;

  let message = "Lỗi cú pháp, thiếu trường dữ liệu. ";
  Object.keys(error.errors).forEach((field) => {
    message += error.errors[field].message + " ";
  });

  return {
    message,
  };
};
exports.handleCheckID = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { message: "ID không hợp lệ" };
  }
};
