const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  total_spending: Number,
  visits: Number,
  last_visit: Date,
});

module.exports = mongoose.model("Customer", CustomerSchema);
