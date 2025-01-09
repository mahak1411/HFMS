const mongoose = require('mongoose');

// Define the schema for the Patient model
const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
    },
    age: {
        type: Number,
        required: true, // Age is required
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true, // Gender is required
    },
    contactInfo: {
            type: String,
            required: true, // Phone number is required
        
    },
    emergencyContact: {
            type: String,
            required: true, // Emergency contact phone number is required

    },
    roomNumber: {
        type: String,
        required: true, // Room number is required
    },
    bedNumber: {
        type: String,
        required: true, // Bed number is required
    },
    floorNumber: {
        type: Number,
        required: true, // Floor number is required
    },
    diseases: [{
        type: String,
    }],
    allergies: [{
        type: String,
    }],
    dietChart: {
        morning: {
            type: String,
        },
        afternoon: {
            type: String,
        },
        evening: {
            type: String,
        },
        night: {
            type: String,
        },
    },
    additionalInfo: {
        type: String,
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create the Patient model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
