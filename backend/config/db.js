const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.log('MongoDB connection error:', err);
        process.exit(1); // Exit the process if the DB connection fails
    });
}

module.exports = connectDB;