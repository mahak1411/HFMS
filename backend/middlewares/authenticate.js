const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Extract token from headers
  const token = req.header('Authorization')?.split(' ')[1]; // Assumes "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next(); // Allow the request to proceed
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
