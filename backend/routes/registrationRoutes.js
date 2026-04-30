const express = require("express");
const router = express.Router();

const Registration = require("../models/Registration");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

// 🔥 Register for an event
router.post("/register/:eventId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.eventId;

    // check event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // prevent duplicate
    const existing = await Registration.findOne({
      user: userId,
      event: eventId
    });

    if (existing) {
      return res.status(400).json({ message: "Already registered" });
    }

    const newRegistration = new Registration({
      user: userId,
      event: eventId
    });

    await newRegistration.save();

    res.json({
      message: "Registered successfully",
      registration: newRegistration
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Get user's registered events
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user.id
    }).populate("event");

    res.json(registrations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;