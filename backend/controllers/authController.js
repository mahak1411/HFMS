const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password, role, phone, emergencyContact, gender, address } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role, // Role (Admin, Pantry Staff, etc.)
            phone, // Added phone field
            emergencyContact, // Added emergency contact field
            gender, // Added gender field
            address, // Added address field
        });

        // Save the user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        }); 
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Login an existing user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Normalize email
        const normalizedEmail = email.toLowerCase();

        // Find user by email
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            console.error('Login error: User not found for email:', normalizedEmail);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error('Login error: Password mismatch for email:', normalizedEmail);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },  // Payload with user ID and role
            process.env.JWT_SECRET,                  // Secret key (stored in .env)
            { expiresIn: '1h' }                     // Token expires in 1 hour
        );

        // Send response with the token
        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Middleware to protect routes (verify token)
exports.protect = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user information to the request object
        req.user = decoded;
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Protect routes based on role
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }
        next();
    };
};
