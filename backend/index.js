// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/AuthRouter');
const patientRoutes = require('./routes/PatientRouter');
const dietRoutes = require('./routes/DietRouter');
const pantryRoutes = require('./routes//PantryRouter');
const deliveryRoutes = require('./routes/DeliveryRouter');

// Import middleware
const errorHandler = require('./middlewares/errorHandler');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON data

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/auth', authRoutes); // Authentication routes (login, signup)
app.use('/api/patient', patientRoutes); // Patient routes
app.use('/api/diets', dietRoutes); // Diet routes
app.use('/api/pantry', pantryRoutes); // Pantry task routes
app.use('/api/delivery', deliveryRoutes); // Delivery task routes

// Error handling middleware
app.use(errorHandler);

// Define a basic route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Hospital Food Manager API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
