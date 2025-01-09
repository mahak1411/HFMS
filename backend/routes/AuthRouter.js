const express = require('express');
const { register, login, protect, restrictTo } = require('../controllers/authController');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/register', register);

// Login an existing user
router.post('/login', login);

// Protected route example (only accessible by Admin)
router.get('/admin', protect, restrictTo('Admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome Admin!' });
});

module.exports = router;
