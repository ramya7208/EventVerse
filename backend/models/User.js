const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
<<<<<<< HEAD
    enum: ["student", "collegeAdmin", "superAdmin"],
    default: "student"
  },
  college: {
    type: String,
    trim: true
  },
  branch: {
    type: String,
    trim: true
  },
  year: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
=======
    default: "student"
>>>>>>> fd6887ba61dd48284d9398957ad68026b9ae55c4
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);