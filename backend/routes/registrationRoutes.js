const express = require("express");
const router = express.Router();

const Registration = require("../models/Registration");
const authMiddleware = require("../middleware/authMiddleware");

// 🔥 Register for an event
router.post("/register/:eventId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.eventId;

    // 🚫 Prevent duplicate registration
    const existing = await Registration.findOne({
      user: userId,
      event: eventId
    });

    if (existing) {
      return res.status(400).json({ message: "Already registered" });
    }

    // ✅ Create registration
    const newRegistration = new Registration({
      user: userId,
      event: eventId
    });

    await newRegistration.save();

    res.json({ message: "Registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// 🔥 Get all events registered by logged-in user
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user.id
    }).populate("event");

    res.json(registrations);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// ⚠️ VERY IMPORTANT
module.exports = router;