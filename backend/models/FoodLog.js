const mongoose = require('mongoose');

const foodLogSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the patient this food log belongs to
        required: true,
    },
    foodItems: [{
        type: String, // List of food items for this log
    }],
    mealTime: {
        type: String,
        enum: ['morning', 'afternoon', 'evening'], // Specifies when the meal is for
        required: true,
    },
    preparationInstructions: {
        type: String, // Any specific instructions for food preparation
    },
    calories: {
        type: Number, // Number of calories for the meal
    },
}, { timestamps: true });

const FoodLog = mongoose.model('FoodLog', foodLogSchema);

module.exports = FoodLog;
