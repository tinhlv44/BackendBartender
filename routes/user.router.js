const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

// Get all users
router.get("/", getUsers);

// Get a specific user by ID
router.get("/:id", getUser);

// Create a new user
router.post("/", createUser);

// Update an existing user
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

module.exports = router;
