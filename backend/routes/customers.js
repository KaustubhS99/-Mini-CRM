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

// GET Route: Fetch all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find(); // Fetch all customers
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

// GET Route: Fetch a customer by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findById(id); // Find customer by ID
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ error: "Failed to fetch customer" });
  }
});

module.exports = router;
