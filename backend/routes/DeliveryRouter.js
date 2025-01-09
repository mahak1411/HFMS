const express = require('express');
const deliveryController = require('../controllers/deliveryController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();
const User = require('../models/User');

// Delivery Routes
// Create a new delivery task
router.post('/deliveries', authenticate, deliveryController.createDelivery);

// Get all delivery tasks
router.get('/deliveries', authenticate, deliveryController.getAllDeliveries);

// Get a specific delivery task by ID
router.get('/deliveries/:deliveryId', authenticate, deliveryController.getDeliveryById);

// Update the status of a delivery task
router.put('/deliveries/:deliveryId', authenticate, deliveryController.updateDeliveryStatus);

// Mark a delivery as completed
router.put('/deliveries/:deliveryId/complete', authenticate, deliveryController.markDeliveryAsCompleted);

// Delete a delivery task
router.delete('/deliveries/:deliveryId', authenticate, deliveryController.deleteDelivery);

// New API Endpoint to fetch delivery staff
router.get('/users', authenticate, async (req, res) => {
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
});

module.exports = router;
