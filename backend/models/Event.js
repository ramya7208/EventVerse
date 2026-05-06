const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["hackathon", "workshop", "webinar", "other"],
    default: "other"
  },
  seats: {
    type: Number,
    required: true,
    default: 100
  },
  seatsBooked: {
    type: Number,
    default: 0
  },
  college: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Event", eventSchema);