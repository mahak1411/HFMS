const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true, // Ensure no two users have the same email
    },
    password: {
        type: String,
        required: true, // Password is required
    },
    role: {
        type: String,
        enum: ['admin', 'pantryStaff', 'deliveryStaff'], // Define possible roles for users
        default: 'admin', // Default role is 'admin'
    },
    phone: {
        type: String,
        required: true, // Phone number is required
    },
    emergencyContact: {
        type: String,
        required: true, // Emergency contact is required
    },
    // Additional optional fields (e.g., gender, address) can be added here
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    address: {
        type: String,
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
