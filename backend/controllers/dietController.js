const DietChart = require('../models/DietChart');
const Patient = require('../models/Patient');

// Create a new diet chart for a patient
exports.createDietChart = async (req, res) => {
    const { patientId, morningMeal, afternoonMeal, eveningMeal, specialInstructions } = req.body;

    try {
        // Check if the patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Create a new diet chart for the patient
        const newDietChart = new DietChart({
            patientId,
            morningMeal,
            afternoonMeal,
            eveningMeal,
            specialInstructions,
        });

        // Save the diet chart to the database
        await newDietChart.save();

        res.status(201).json({
            message: 'Diet chart created successfully',
            dietChart: newDietChart,
        });
    } catch (error) {
        console.error('Error creating diet chart:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all diet charts
exports.getAllDietCharts = async (req, res) => {
    try {
        // Fetch all diet charts from the database and populate patient details
        const dietCharts = await DietChart.find().populate('patientId', 'name age');

        res.status(200).json({
            message: 'Diet charts retrieved successfully',
            dietCharts,
        });
    } catch (error) {
        console.error('Error fetching diet charts:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a specific diet chart by ID
exports.getDietChartById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the diet chart by ID and populate patient details
        const dietChart = await DietChart.findById(id).populate('patientId', 'name age');

        if (!dietChart) {
            return res.status(404).json({ message: 'Diet chart not found' });
        }

        res.status(200).json({
            message: 'Diet chart details retrieved successfully',
            dietChart,
        });
    } catch (error) {
        console.error('Error fetching diet chart by ID:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a specific diet chart
exports.updateDietChart = async (req, res) => {
    const { id } = req.params;
    const { morningMeal, afternoonMeal, eveningMeal, specialInstructions } = req.body;

    try {
        // Find the diet chart by ID
        const dietChart = await DietChart.findById(id);

        if (!dietChart) {
            return res.status(404).json({ message: 'Diet chart not found' });
        }

        // Update diet chart details
        dietChart.morningMeal = morningMeal || dietChart.morningMeal;
        dietChart.afternoonMeal = afternoonMeal || dietChart.afternoonMeal;
        dietChart.eveningMeal = eveningMeal || dietChart.eveningMeal;
        dietChart.specialInstructions = specialInstructions || dietChart.specialInstructions;

        // Save the updated diet chart
        await dietChart.save();

        res.status(200).json({
            message: 'Diet chart updated successfully',
            dietChart,
        });
    } catch (error) {
        console.error('Error updating diet chart:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a specific diet chart
exports.deleteDietChart = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the diet chart by ID
        const dietChart = await DietChart.findByIdAndDelete(id);

        if (!dietChart) {
            return res.status(404).json({ message: 'Diet chart not found' });
        }

        res.status(200).json({
            message: 'Diet chart deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting diet chart:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
