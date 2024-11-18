const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Campaign = require("../models/Campaign");
const Audience = require("../models/Audience");
const Customer = require("../models/Customer");

router.post("/", async (req, res) => {
  const { audience_id, message_template } = req.body;

  try {
    console.log("Request received:", { audience_id, message_template });

    // Validate audience_id
    if (!mongoose.Types.ObjectId.isValid(audience_id)) {
      console.error("Invalid audience_id:", audience_id);
      return res.status(400).json({ error: "Invalid audience_id" });
    }

    // Fetch the audience
    const audience = await Audience.findById(audience_id);
    if (!audience) {
      console.error("Audience not found for ID:", audience_id);
      return res.status(404).json({ error: "Audience not found" });
    }
    console.log("Audience found:", audience);

    // Find customers matching the audience conditions
    const customers = await Customer.find(audience.conditions);
    if (!customers || customers.length === 0) {
      console.error(
        "No customers match the audience conditions:",
        audience.conditions
      );
      return res
        .status(400)
        .json({ error: "No customers found in the audience" });
    }
    console.log("Customers found:", customers);

    // Generate delivery status and save campaign
    const deliveryStatus = customers.map((customer) => {
      const personalizedMessage = message_template.replace(
        "[Name]",
        customer.name
      );
      const status = Math.random() < 0.9 ? "SENT" : "FAILED";
      return { customer_id: customer._id, status };
    });

    const totalSent = deliveryStatus.filter((d) => d.status === "SENT").length;
    const totalFailed = deliveryStatus.filter(
      (d) => d.status === "FAILED"
    ).length;

    const newCampaign = new Campaign({
      audience_id,
      message_template,
      delivery_status: deliveryStatus,
      stats: { total_sent: totalSent, total_failed: totalFailed },
    });

    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error("Error in send campaign route:", error);
    res.status(500).json({ error: "Failed to send campaign" });
  }
});

module.exports = router;
