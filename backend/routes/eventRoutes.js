const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ CREATE EVENT (Protected)
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

// ✅ UPDATE EVENT
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // only creator can update
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEvent);

  } catch (error) {
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