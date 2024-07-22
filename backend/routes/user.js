const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

// Middleware to authenticate JWT token
router.use(authenticateToken);

// Update username or password
router.put('/update', async (req, res) => {
  const { username, password, newPassword } = req.body;
  const userId = req.user.userId; // Get userId from the token

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (username) user.username = username;
    if (password && newPassword) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(403).json({ message: 'Invalid current password' });
      
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();
    res.json({ message: 'User information updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user information' });
  }
});

// Delete account
router.delete('/delete', async (req, res) => {
  const userId = req.user.userId; // Get userId from the token

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await User.findByIdAndDelete(userId);
    res.json({ message: 'Account deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Error deleting account' });
  }
});

module.exports = router;
