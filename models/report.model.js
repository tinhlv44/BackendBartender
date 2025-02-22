const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    reported_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    report_reason: String,
    report_status: {
      type: String,
      enum: ["pending", "resolved", "dismissed"],
      default: "pending",
    },
    created_at: { type: Date, default: Date.now },
    resolved_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    resolved_at: Date,
    user_reported: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action_taken: String,
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema);
module.exports = Report;
