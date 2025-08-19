const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//@route POST /api/admin/users/login
//@desc Admin login
//@access Private
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check role
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "admin"], // changed "user" to "customer"
      default: "customer",         // changed default from "user" to "customer"
    },
  },
  { timestamps: true }
);


//@route GET /api/admin/users
//@desc Get all users(Admin only)
//@access Private/Admin
router.get('/users', protect, admin, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

//@route POST /api/admin/users
//@desc Create a new user (Admin only)
//@access Private/Admin
router.post('/users', protect, admin, async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            role: role || "customer" // Default role is customer
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//@route PUT /api/admin/users/:id
//@desc Update user details (Admin only)    
//@access Private/Admin
router.put('/users/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;

            const updatedUser = await user.save(); //save the user to the db
            res.json({ message: 'User updated successfully', user: updatedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//@route DELETE /api/admin/users/:id
//@desc Delete a user
//@access Private/Admin
router.delete('/users/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;