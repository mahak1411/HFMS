const Patient = require('../models/Patient');

// Create a new patient
exports.createPatient = async (req, res) => {
    const { name, age, gender, contactInfo, emergencyContact, diseases, allergies, roomNumber, bedNumber, floorNumber, additionalDetails } = req.body;

    try {
        // Create a new patient
        const newPatient = new Patient({
            name,
            age,
            gender,
            contactInfo,
            emergencyContact,
            diseases,
            allergies,
            roomNumber,
            bedNumber,
            floorNumber,
            additionalDetails,
        });

        // Save the new patient to the database
        await newPatient.save();

        res.status(201).json({
            message: 'Patient created successfully',
            patient: newPatient,
        });
    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        // Fetch all patients from the database
        const patients = await Patient.find();

        res.status(200).json({
            message: 'Patients retrieved successfully',
            patients,
        });
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a specific patient by ID
exports.getPatientById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the patient by ID
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({
            message: 'Patient details retrieved successfully',
            patient,
        });
    } catch (error) {
        console.error('Error fetching patient by ID:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update patient details
exports.updatePatient = async (req, res) => {
    const { id } = req.params;
    const { name, age, gender, contactInfo, emergencyContact, diseases, allergies, roomNumber, bedNumber, floorNumber, additionalDetails } = req.body;

    try {
        // Find the patient by ID
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Update patient details
        patient.name = name || patient.name;
        patient.age = age || patient.age;
        patient.gender = gender || patient.gender;
        patient.contactInfo = contactInfo || patient.contactInfo;
        patient.emergencyContact = emergencyContact || patient.emergencyContact;
        patient.diseases = diseases || patient.diseases;
        patient.allergies = allergies || patient.allergies;
        patient.roomNumber = roomNumber || patient.roomNumber;
        patient.bedNumber = bedNumber || patient.bedNumber;
        patient.floorNumber = floorNumber || patient.floorNumber;
        patient.additionalDetails = additionalDetails || patient.additionalDetails;

        // Save the updated patient details
        await patient.save();

        res.status(200).json({
            message: 'Patient updated successfully',
            patient,
        });
    } catch (error) {
        console.error('Error updating patient details:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the patient by ID
        const patient = await Patient.findByIdAndDelete(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({
            message: 'Patient deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
