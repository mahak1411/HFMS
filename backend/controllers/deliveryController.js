const Delivery = require('../models/Delivery');
const DietChart = require('../models/DietChart');
const User = require('../models/User');

exports.getDeliveryStaff = async (req, res) => {
    try {
        // Fetch users with the role 'deliveryStaff'
        const deliveryStaff = await User.find({ role: 'deliveryStaff' });

        // If no delivery staff found, return a 404 response
        if (!deliveryStaff.length) {
            return res.status(404).json({ message: 'No delivery staff found' });
        }

        res.status(200).json({
            message: 'Delivery staff retrieved successfully',
            users: deliveryStaff,
        });
    } catch (error) {
        console.error('Error fetching delivery staff:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new delivery task
exports.createDelivery = async (req, res) => {
    const { dietChartId, deliveryStaffId, deliveryDetails } = req.body;

    try {
        // Check if the diet chart exists
        const dietChart = await DietChart.findById(dietChartId);
        if (!dietChart) {
            return res.status(404).json({ message: 'Diet chart not found' });
        }

        // Extract the patientId from the diet chart
        const patientId = dietChart.patientId;
        if (!patientId) {
            return res.status(400).json({ message: 'Patient ID is missing from the diet chart' });
        }

        // Check if the delivery staff exists
        const deliveryStaff = await User.findById(deliveryStaffId);
        if (!deliveryStaff || deliveryStaff.role !== 'deliveryStaff') {
            return res.status(404).json({ message: 'Delivery staff not found or is not a delivery staff member' });
        }

        // Create a new delivery task
        const newDelivery = new Delivery({
            dietChart: dietChartId,
            deliveryPerson: deliveryStaffId,
            deliveryDetails,
            patient: patientId,  // Include the patientId in the delivery task
            status: 'pending', // Initially, the status will be "Pending"
        });

        // Save the new delivery task
        await newDelivery.save();

        res.status(201).json({
            message: 'Delivery task created successfully',
            delivery: newDelivery,
        });
    } catch (error) {
        console.error('Error creating delivery task:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Get all delivery tasks
exports.getAllDeliveries = async (req, res) => {
    try {
        // Retrieve all delivery tasks from the database
        const deliveries = await Delivery.find()
            .populate('dietChart', 'foodItems mealTime')
            .populate('deliveryPerson', 'name role');

        res.status(200).json({
            message: 'Delivery tasks retrieved successfully',
            deliveries,
        });
    } catch (error) {
        console.error('Error fetching deliveries:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a specific delivery task by ID
exports.getDeliveryById = async (req, res) => {
    const { deliveryId } = req.params;

    try {
        // Retrieve the specific delivery task by ID
        const delivery = await Delivery.findById(deliveryId)
            .populate('dietChart', 'foodItems mealTime')
            .populate('deliveryPerson', 'name role');

        if (!delivery) {
            return res.status(404).json({ message: 'Delivery task not found' });
        }

        res.status(200).json({
            message: 'Delivery task details retrieved successfully',
            delivery,
        });
    } catch (error) {
        console.error('Error fetching delivery task:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update the status of a delivery task (e.g., Mark as Delivered)
exports.updateDeliveryStatus = async (req, res) => {
    const { deliveryId } = req.params;
    const { status, deliveryNotes } = req.body;

    try {
        // Find the specific delivery task
        const delivery = await Delivery.findById(deliveryId);

        if (!delivery) {
            return res.status(404).json({ message: 'Delivery task not found' });
        }

        // Update the delivery status
        delivery.status = status || delivery.status;
        delivery.deliveryNotes = deliveryNotes || delivery.deliveryNotes;

        // Save the updated delivery task
        await delivery.save();

        res.status(200).json({
            message: 'Delivery status updated successfully',
            delivery,
        });
    } catch (error) {
        console.error('Error updating delivery status:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Mark a delivery as completed (Done)
exports.markDeliveryAsCompleted = async (req, res) => {
    const { deliveryId } = req.params;

    try {
        // Find the delivery task
        const delivery = await Delivery.findById(deliveryId);

        if (!delivery) {
            return res.status(404).json({ message: 'Delivery task not found' });
        }

        // Mark the delivery as completed
        delivery.status = 'completed';
        delivery.deliveryCompletedAt = new Date(); // Optional: timestamp for completion

        // Save the updated delivery task
        await delivery.save();

        res.status(200).json({
            message: 'Delivery marked as completed successfully',
            delivery,
        });
    } catch (error) {
        console.error('Error marking delivery as completed:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a specific delivery task
exports.deleteDelivery = async (req, res) => {
    const { deliveryId } = req.params;

    try {
        // Find and delete the delivery task by ID
        const delivery = await Delivery.findByIdAndDelete(deliveryId);

        if (!delivery) {
            return res.status(404).json({ message: 'Delivery task not found' });
        }

        res.status(200).json({
            message: 'Delivery task deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting delivery task:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
