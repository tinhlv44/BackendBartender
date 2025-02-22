const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    avatarURL: { type: String, default: "" },
    joinedAt: { type: Date, default: Date.now },
    last_active: { type: Date, default: Date.now },
    bio: { type: String, default: "" },
    role: { type: String, enum: ["Member", "Partner"], default: "Member" },
    isPremium: { type: Boolean, default: false },
    premium_expiry_date: { type: Date, default: null },
    socialLinks: { type: [String], default: [] },
    activity_status: { type: Boolean, default: true },
    last_active_date: Date,
  }, //this will auto update the timestamp when we do inserting or updating documents of this type schema
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
