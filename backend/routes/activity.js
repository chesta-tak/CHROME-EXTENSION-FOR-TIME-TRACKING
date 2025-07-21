// backend/routes/activity.js
const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify token and extract user
const authenticateUser = (req, res, next) => {
  console.log('Auth headers:', req.headers); // Add this line
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
router.post('/', authenticateUser, async (req, res) => {
  const { url, timeSpent } = req.body;

  let category = 'Other'; // Default fallback
  const productiveSites = ['github.com', 'stackoverflow.com', 'w3schools.com', 'chat.openai.com'];
  const unproductiveSites = ['youtube.com', 'instagram.com', 'facebook.com', 'netflix.com'];

  if (productiveSites.some(domain => url.includes(domain))) {
    category = 'Productive';
  } else if (unproductiveSites.some(domain => url.includes(domain))) {
    category = 'Unproductive';
  }

  // Allow frontend override
  if (req.body.category) {
    category = req.body.category;
  }

  try {
    const activity = new Activity({
      userId: req.userId,
      url,
      timeSpent,
      category,
    });

    await activity.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving activity' });
  }
});

// GET /api/activity - fetch activities for logged-in user
router.get('/', authenticateUser, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.userId }).sort({ timestamp: -1 });
    res.status(200).json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching activities' });
  }
});

module.exports = router;
