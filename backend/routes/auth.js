const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// JWT Secret Key (store this in an environment variable for production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Registration Endpoint
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Hash password and create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).send('User registered');
});

// Login Endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user and verify password
  const user = await User.findOne({ username });
  if (!user) return res.status(404).send('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(403).send('Invalid credentials');

  // Generate JWT token
  const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Logout Endpoint (Optional for clearing client-side tokens)
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Assuming token is stored in a cookie
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
