const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: Number,
    payment_method: String,
    payment_status: { type: String, enum: ["completed", "pending", "failed"] },
    payment_date: { type: Date, default: Date.now },
    transaction_id: String,
    subscription_type: { type: String, enum: ["monthly", "yearly"] },
    currency: String,
    invoice_url: String,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
