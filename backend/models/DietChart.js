const mongoose = require('mongoose');

const dietChartSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference to the Patient model
    required: true
  },
  morningMeal: {
    type: [String], // List of food items for morning meal
    required: true
  },
  afternoonMeal: {
    type: [String], // List of food items for afternoon meal
    required: true
  },
  eveningMeal: {
    type: [String], // List of food items for evening meal
    required: true
  },
  specialInstructions: {
    type: String, // Special instructions (e.g., "low salt", "no sugar")
    default: ''
  }
}, { timestamps: true });

const DietChart = mongoose.model('DietChart', dietChartSchema);

module.exports = DietChart;
