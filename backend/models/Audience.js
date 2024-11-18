/*

const mongoose = require("mongoose");

const AudienceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  conditions: { type: Object, required: true },
  size: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Audience", AudienceSchema);
*/

const mongoose = require("mongoose");

const AudienceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  customer_ids: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  ], // Array of customer IDs
  conditions: { type: Object }, // Optional if dynamic conditions are still needed
  size: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Audience", AudienceSchema);
