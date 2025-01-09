const PantryTask = require('../models/PantryTask');
const Delivery = require('../models/Delivery');
const User = require('../models/User');

// Create a new pantry task
exports.createPantryTask = async (req, res) => {
    const {pantryStaffId, meal,taskDescription, patientId  , status } = req.body;

    try {
        // Check if the assigned staff exists and is pantry staff
        console.log({pantryStaffId})
        const pantryStaff = await User.findById(pantryStaffId);
        if (!pantryStaff || pantryStaff.role !== 'pantryStaff') {
            return res.status(404).json({ message: 'Staff member not found or is not a pantry staff' });
        }

        // Create a new pantry task
        const newPantryTask = new PantryTask({
            meal,
            patient: patientId,
            pantryStaff: pantryStaffId,
            taskDescription,
            status,
        });

        // Save the pantry task to the database
        await newPantryTask.save();

        res.status(201).json({
            message: 'Pantry task created successfully',
            pantryTask: newPantryTask,
        });
    } catch (error) {
        console.error('Error creating pantry task:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all pantry tasks
exports.getAllPantryTasks = async (req, res) => {
    try {
        // Fetch all pantry tasks with populated fields
        const pantryTasks = await PantryTask.find()
            .populate('pantryStaff', 'name role')
            .populate('patient', 'name age');

        res.status(200).json({
            message: 'Pantry tasks retrieved successfully',
            pantryTasks,
        });
    } catch (error) {
        console.error('Error fetching pantry tasks:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a specific pantry task by ID
exports.getPantryTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the pantry task by ID
        const pantryTask = await PantryTask.findById(id)
            .populate('pantryStaff', 'name role')
            .populate('patient', 'name age');

        if (!pantryTask) {
            return res.status(404).json({ message: 'Pantry task not found' });
        }

        res.status(200).json({
            message: 'Pantry task details retrieved successfully',
            pantryTask,
        });
    } catch (error) {
        console.error('Error fetching pantry task by ID:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a specific pantry task
exports.updatePantryTask = async (req, res) => {
    const { id } = req.params;
    const { meal, patientId, pantryStaffId, taskDescription, status } = req.body;

    try {
        // Find the pantry task by ID
        const pantryTask = await PantryTask.findById(id);

        if (!pantryTask) {
            return res.status(404).json({ message: 'Pantry task not found' });
        }

        // Validate pantry staff if updated
        if (pantryStaffId) {
            const pantryStaff = await User.findById(pantryStaffId);
            if (!pantryStaff || pantryStaff.role !== 'pantryStaff') {
                return res.status(404).json({ message: 'Assigned staff is not a valid pantry staff' });
            }
        }

        // Update the pantry task details
        pantryTask.meal = meal || pantryTask.meal;
        pantryTask.patient = patientId || pantryTask.patient;
        pantryTask.pantryStaff = pantryStaffId || pantryTask.pantryStaff;
        pantryTask.taskDescription = taskDescription || pantryTask.taskDescription;
        pantryTask.status = status || pantryTask.status;

        // Save the updated pantry task
        await pantryTask.save();

        res.status(200).json({
            message: 'Pantry task updated successfully',
            pantryTask,
        });
    } catch (error) {
        console.error('Error updating pantry task:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a specific pantry task
exports.deletePantryTask = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the pantry task by ID
        const pantryTask = await PantryTask.findByIdAndDelete(id);

        if (!pantryTask) {
            return res.status(404).json({ message: 'Pantry task not found' });
        }

        res.status(200).json({
            message: 'Pantry task deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting pantry task:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Assign a delivery task to a pantry staff
exports.assignDeliveryTask = async (req, res) => {
    const { pantryTaskId, deliveryStaffId, deliveryDetails } = req.body;

    try {
        // Find the pantry task
        const pantryTask = await PantryTask.findById(pantryTaskId);
        if (!pantryTask) {
            return res.status(404).json({ message: 'Pantry task not found' });
        }

        // Create a new delivery task
        const newDelivery = new Delivery({
            pantryTask: pantryTaskId,
            deliveryStaff: deliveryStaffId,
            deliveryDetails,
            status: 'Pending',
        });

        // Save the delivery task
        await newDelivery.save();

        res.status(201).json({
            message: 'Delivery task assigned successfully',
            delivery: newDelivery,
        });
    } catch (error) {
        console.error('Error assigning delivery task:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update delivery status
exports.updateDeliveryStatus = async (req, res) => {
    const { deliveryId } = req.params;
    const { status } = req.body;

    try {
        // Find the delivery task
        const delivery = await Delivery.findById(deliveryId);

        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        // Update the delivery status
        delivery.status = status;

        // Save the updated delivery status
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
