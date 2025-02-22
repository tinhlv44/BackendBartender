const Recipe = require("../models/recipe.model");
const Category = require("../models/category.model");

// Lấy danh sách công thức (hỗ trợ lọc theo category, difficulty, premium)
exports.getAllRecipes = async (req, res) => {
  try {
    const { category, difficulty, isPremium } = req.query;
    let filter = {};

    if (category) {
      const foundCategory = await Category.findOne({ name: category });
      if (foundCategory) {
        filter.category = foundCategory._id;
      } else {
        return res.status(404).json({ error: "Không tìm thấy thể loại này" });
      }
    }

    if (difficulty) filter.difficulty = difficulty;
    if (isPremium !== undefined) filter.isPremiumRecipe = isPremium === "true";

    const recipes = await Recipe.find(filter)
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách công thức" });
  }
};

// Lấy công thức theo ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("category");
    if (!recipe) {
      return res.status(404).json({ error: "Không tìm thấy công thức" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy công thức" });
  }
};

// Tạo mới công thức
exports.createRecipe = async (req, res) => {
  try {
    const { category, ...rest } = req.body;
    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      return res.status(400).json({ error: "Thể loại không hợp lệ" });
    }

    const newRecipe = new Recipe({ ...rest, category });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi tạo công thức" });
  }
};

// Cập nhật công thức
exports.updateRecipe = async (req, res) => {
  try {
    const { category, ...rest } = req.body;
    if (category) {
      const foundCategory = await Category.findById(category);
      if (!foundCategory) {
        return res.status(400).json({ error: "Thể loại không hợp lệ" });
      }
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { ...rest, category },
      { new: true }
    ).populate("category");

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Không tìm thấy công thức" });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật công thức" });
  }
};

// Xóa công thức
exports.deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: "Không tìm thấy công thức" });
    }
    res.status(200).json({ message: "Xóa công thức thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa công thức" });
  }
};
