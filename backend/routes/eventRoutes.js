const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ CREATE EVENT (Protected)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      createdBy: req.user.id
    });

    await newEvent.save();

    res.json({ message: "Event created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET ALL EVENTS
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");

    res.json(events);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;