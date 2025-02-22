const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    targetType: {
      type: String,
      enum: ["post", "recipe", "comment"],
      required: true,
    },
  },
  { timestamps: true }
);

// Tạo model từ schema
const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
