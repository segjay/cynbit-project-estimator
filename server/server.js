require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 1. connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err.message));

// 2. what a lead looks like
const Lead = mongoose.model("Lead", {
  name: String,
  email: String,
  companySize: String,
  brief: String,
  service: String,
  modules: [String],
  urgent: Boolean,
  priceMin: Number,
  priceMax: Number,
  days: Number,
  createdAt: { type: Date, default: Date.now },
});

// 3. save a lead
app.post("/api/leads", async (req, res) => {
  try {
    await Lead.create(req.body);
    res.json({ message: "Lead saved" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 4. show all leads (needs admin password)
app.get("/api/leads", async (req, res) => {
  if (req.headers["x-admin-password"] !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Wrong password" });
  }
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));