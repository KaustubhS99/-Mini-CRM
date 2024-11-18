const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const audiencesRoute = require("./routes/audiences");
app.use("/audiences", audiencesRoute); // Register the audiences route

const campaignsRoute = require("./routes/campaigns");
app.use("/campaigns", campaignsRoute); // Register the campaigns route

const customersRoute = require("./routes/customers");
app.use("/customers", customersRoute); // Register customers route

const ordersRoute = require("./routes/orders");
app.use("/orders", ordersRoute);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
