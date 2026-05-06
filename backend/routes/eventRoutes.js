const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ CREATE EVENT - COLLEGE ADMIN
router.post("/create-college-event", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, location, duration, category, seats } = req.body;

    // Get user info
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is college admin
    if (user.role !== "collegeAdmin") {
      return res.status(403).json({ message: "Only college admins can create events" });
    }

    // Validate required fields
    if (!title || !description || !date || !location || !duration || !category || !seats) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate title
    if (title.trim().length < 3) {
      return res.status(400).json({ message: "Event title must be at least 3 characters" });
    }

    // Validate seats
    if (seats < 1) {
      return res.status(400).json({ message: "Seats must be at least 1" });
    }

    // Create new event
    const newEvent = new Event({
      title: title.trim(),
      description: description.trim(),
      date: new Date(date),
      location: location.trim(),
      duration: duration.trim(),
      category,
      seats: parseInt(seats),
      college: user.college,
      createdBy: req.user.id,
      status: "pending"
    });

    await newEvent.save();

    res.json({
      message: "Event created successfully and pending approval",
      event: newEvent
    });

  } catch (error) {
    console.error("Event creation error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET COLLEGE ADMIN'S EVENTS
router.get("/my-events", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "collegeAdmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const events = await Event.find({ createdBy: req.user.id })
      .populate("createdBy", "name email college")
      .sort({ createdAt: -1 });

    res.json(events);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ CREATE EVENT (Protected - Legacy)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    // validation
    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      duration: "N/A",
      college: "General",
      createdBy: req.user.id
    });

    await newEvent.save();

    res.json({
      message: "Event created successfully",
      event: newEvent
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET ALL EVENTS
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(events);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ APPROVE/REJECT EVENT - SUPER ADMIN ONLY
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    // Get user info
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is super admin
    if (user.role !== "superAdmin") {
      return res.status(403).json({ message: "Only super admins can approve/reject events" });
    }

    // Validate status
    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be approved, rejected, or pending" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.status = status;
    await event.save();

    res.json({
      message: `Event ${status} successfully`,
      event
    });

  } catch (error) {
    console.error("Event status update error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ DELETE EVENT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await event.deleteOne();

    res.json({ message: "Event deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;