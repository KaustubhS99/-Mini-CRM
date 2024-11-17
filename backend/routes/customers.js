const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.post("/", async (req, res) => {
  console.log("Incoming request to /customers:", req.body);

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ error: "Name, email, and phone are required" });
  }

  try {
    let customer = await Customer.findOne({ email });
    if (!customer) {
      customer = new Customer({ name, email, phone });
      await customer.save();
    }

    res.status(201).json(customer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
