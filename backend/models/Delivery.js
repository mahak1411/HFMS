const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    deliveryPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the delivery person user
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the patient receiving the meal
        required: true,
    },
    dietChart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DietChart', // Reference to the specific diet chart for the patient
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'delivered'],
        default: 'pending',
    },
    deliveryTimestamp: {
        type: Date,
    },
}, { timestamps: true });

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
