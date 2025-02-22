const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "ID người theo dõi là bắt buộc"],
      ref: "User",
    },
    followingUserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "ID người được theo dõi là bắt buộc"],
      ref: "User",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Follow = mongoose.model("Follow", followSchema);
module.exports = Follow;
