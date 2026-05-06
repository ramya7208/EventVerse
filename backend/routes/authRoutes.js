const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authMiddleware");//newly added
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
// GET USER PROFILE(newly addeed)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
<<<<<<< HEAD
    const { name, email, password, role, college, branch, year, phone } = req.body;
=======
    const { name, email, password, role } = req.body;
>>>>>>> fd6887ba61dd48284d9398957ad68026b9ae55c4

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate name
    if (name.trim().length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters long" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered. Please login or use a different email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

<<<<<<< HEAD
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || "student",
      college: college ? college.trim() : null,
      branch: branch ? branch.trim() : null,
      year: year ? year.trim() : null,
      phone: phone ? phone.trim() : null
    });
=======
    

const newUser = new User({
  name,
  email,
  password: hashedPassword,
  role
});
>>>>>>> fd6887ba61dd48284d9398957ad68026b9ae55c4

    await newUser.save();

    // optional token after register
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        college: newUser.college
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed. Please try again later." });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
<<<<<<< HEAD
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        college: user.college,
        branch: user.branch,
        year: user.year,
        phone: user.phone
      }
    });
=======
  token,
  user: {
    name: user.name,
    email: user.email,
    role: user.role
  }
});
>>>>>>> fd6887ba61dd48284d9398957ad68026b9ae55c4

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ PROTECTED ROUTE
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    userId: req.user.id
  });
});

module.exports = router;