const mongoose = require('mongoose');

const PantryTaskSchema = new mongoose.Schema({
    meal: { type: String, required: true },
    taskDescription: { type: String, required: true },
    pantryStaff: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('PantryTask', PantryTaskSchema);
