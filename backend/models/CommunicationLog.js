const mongoose = require("mongoose");

const CommunicationLogSchema = new mongoose.Schema({
  audience_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Audience",
    required: true,
  },
  message_template: {
    type: String,
    required: true,
  },
  delivery_status: [
    {
      customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
      },
      status: {
        type: String,
        enum: ["SENT", "FAILED"],
        default: "PENDING",
      },
    },
  ],
  stats: {
    total_sent: {
      type: Number,
      default: 0,
    },
    total_failed: {
      type: Number,
      default: 0,
    },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CommunicationLog", CommunicationLogSchema);
