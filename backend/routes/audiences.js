/*
const express = require("express");
const router = express.Router();
const Audience = require("../models/Audience");
const Customer = require("../models/Customer"); // Ensure this path is correct

// GET /audiences - Fetch all audiences
router.get("/", async (req, res) => {
  try {
    const audiences = await Audience.find(); // Fetch all audiences from the database
    res.status(200).json(audiences); // Send the audiences as JSON
  } catch (error) {
    console.error("Error fetching audiences:", error);
    res.status(500).json({ error: "Failed to fetch audiences" });
  }
});

// POST /audiences - Create an audience
router.post("/", async (req, res) => {
  const { name, conditions } = req.body;

  try {
    // Query customers matching the conditions
    const matchingCustomers = await Customer.find(conditions);
    const audienceSize = matchingCustomers.length;

    // Save the audience
    const newAudience = new Audience({
      name,
      conditions,
      size: audienceSize,
    });
    await newAudience.save();

    res.status(201).json(newAudience);
  } catch (error) {
    console.error("Error creating audience:", error);
    res.status(500).json({ error: "Failed to create audience" });
  }
});

module.exports = router;
 */

const express = require("express");
const router = express.Router();
const Audience = require("../models/Audience");
const Customer = require("../models/Customer");

// GET /audiences - Fetch all audiences
router.get("/", async (req, res) => {
  try {
    const audiences = await Audience.find().populate("customer_ids"); // Populate customer details
    res.status(200).json(audiences);
  } catch (error) {
    console.error("Error fetching audiences:", error);
    res.status(500).json({ error: "Failed to fetch audiences" });
  }
});

// POST /audiences - Create an audience
router.post("/", async (req, res) => {
  const { name, customer_ids } = req.body;

  try {
    // Validate customer IDs
    const customers = await Customer.find({ _id: { $in: customer_ids } });
    if (customers.length === 0) {
      return res
        .status(400)
        .json({ error: "No valid customers found for the provided IDs" });
    }

    // Save the audience
    const newAudience = new Audience({
      name,
      customer_ids,
      size: customers.length,
    });

    await newAudience.save();
    res.status(201).json(newAudience);
  } catch (error) {
    console.error("Error creating audience:", error);
    res.status(500).json({ error: "Failed to create audience" });
  }
});

module.exports = router;
