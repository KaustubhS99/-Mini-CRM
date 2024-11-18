const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  audience_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Audience",
    required: true,
  },
  message_template: { type: String, required: true },
  delivery_status: [
    {
      customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
      status: { type: String, enum: ["SENT", "FAILED"], required: true },
    },
  ],
  stats: {
    total_sent: { type: Number, required: true },
    total_failed: { type: Number, required: true },
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Campaign", CampaignSchema);
