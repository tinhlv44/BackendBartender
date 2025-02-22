const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: [true, "Tên công thức không được để trống"],
      trim: true,
    },
    ingredients: {
      type: [String],
      required: [true, "Danh sách nguyên liệu không được để trống"],
    },
    steps: {
      type: [String],
      required: [true, "Hướng dẫn pha chế không được để trống"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Thể loại là bắt buộc"],
    },
    imageURL: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      trim: true,
    },
    isPremiumRecipe: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: String,
      enum: ["Dễ", "Trung bình", "Khó"],
      required: [true, "Độ khó là bắt buộc"],
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
