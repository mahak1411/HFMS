const express = require('express');
const dietController = require('../controllers/dietController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

// Create a new diet chart for a patient
router.post('/diet-charts', authenticate, dietController.createDietChart);

// Get all diet charts
router.get('/diet-charts', authenticate, dietController.getAllDietCharts);

// Get a specific diet chart by ID
router.get('/diet-charts/:id', authenticate, dietController.getDietChartById);

// Update a specific diet chart
router.put('/diet-charts/:id', authenticate, dietController.updateDietChart);

// Delete a specific diet chart
router.delete('/diet-charts/:id', authenticate, dietController.deleteDietChart);

module.exports = router;
