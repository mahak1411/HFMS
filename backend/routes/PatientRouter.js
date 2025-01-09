const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate')

// Create a new patient
router.post('/patients',authenticate, patientController.createPatient);

// Get all patients
router.get('/patients',authenticate, patientController.getAllPatients);

// Update a specific patient's details
router.put('/patients/:id',authenticate, patientController.updatePatient);

// Delete a specific patient
router.delete('/patients/:id',authenticate, patientController.deletePatient);

module.exports = router;
