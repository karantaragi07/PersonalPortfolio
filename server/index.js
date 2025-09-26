const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Load .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, "data");
const viewsFile = path.join(dataDir, "views.json");

// Ensure data directory exists
function ensureDataFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(viewsFile))
    fs.writeFileSync(viewsFile, JSON.stringify({ count: 0 }, null, 2));
}

function readViewsCount() {
  ensureDataFile();
  const raw = fs.readFileSync(viewsFile, "utf-8");
  const data = JSON.parse(raw);
  return typeof data.count === "number" ? data.count : 0;
}

function writeViewsCount(count) {
  ensureDataFile();
  fs.writeFileSync(viewsFile, JSON.stringify({ count }, null, 2));
}

// Health Check
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// Views count
app.get("/api/views", (_req, res) => res.json({ count: readViewsCount() }));

app.post("/api/views/increment", (_req, res) => {
  const next = readViewsCount() + 1;
  writeViewsCount(next);
  res.json({ count: next });
});

// Contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, linkedin, message } = req.body || {};
    if (!name || !email || !message)
      return res.status(400).json({ error: "Missing required fields" });

    const text = `New message from ${name}\nEmail: ${email}\nLinkedIn: ${
      linkedin || "Not provided"
    }\nMessage:\n${message}`;

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to send message" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
