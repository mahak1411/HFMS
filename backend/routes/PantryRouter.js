const express = require('express');
const pantryController = require('../controllers/pantryController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

// Create a new pantry task
router.post('/pantry-tasks',authenticate, pantryController.createPantryTask);

// Get all pantry tasks
router.get('/pantry-tasks',authenticate, pantryController.getAllPantryTasks);

// Get a specific pantry task by ID
router.get('/pantry-tasks/:id',authenticate, pantryController.getPantryTaskById);

// Update a specific pantry task
router.put('/pantry-tasks/:id',authenticate, pantryController.updatePantryTask);

// Delete a specific pantry task
router.delete('/pantry-tasks/:id',authenticate, pantryController.deletePantryTask);

// Assign a delivery task to pantry staff
router.post('/assign-delivery',authenticate, pantryController.assignDeliveryTask);

// Update delivery status
router.put('/delivery-status/:deliveryId',authenticate, pantryController.updateDeliveryStatus);

module.exports = router;
