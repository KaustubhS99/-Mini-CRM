const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Customer = require("../models/Customer");

router.post("/", async (req, res) => {
  const { customer_id, amount } = req.body;
  console.log("Incoming request to /orders:", req.body);

  if (!customer_id || !amount) {
    console.error("Validation failed for /orders");
    return res
      .status(400)
      .json({ error: "Customer ID and amount are required" });
  }

  try {
    const customer = await Customer.findById(customer_id);
    if (!customer) {
      console.error("Customer not found for /orders:", customer_id);
      return res.status(404).json({ error: "Customer not found" });
    }

    const order = new Order({ customer_id, amount });
    const savedOrder = await order.save();
    console.log("Order created successfully:", savedOrder);
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error in /orders:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
