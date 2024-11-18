const express = require("express");
const router = express.Router();
const CommunicationLog = require("../models/CommunicationLog");

router.post("/", async (req, res) => {
  const { log_id, delivery_updates } = req.body;

  try {
    const log = await CommunicationLog.findById(log_id);
    if (!log) return res.status(404).json({ error: "Log not found" });

    delivery_updates.forEach((update) => {
      const delivery = log.delivery_status.find(
        (d) => d.customer_id.toString() === update.customer_id
      );
      if (delivery) delivery.status = update.status;
    });

    await log.save();
    res.status(200).json({ message: "Delivery statuses updated" });
  } catch (error) {
    console.error("Error updating delivery statuses:", error);
    res.status(500).json({ error: "Failed to update delivery statuses" });
  }
});

module.exports = router;
