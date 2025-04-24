const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        // Check if user already exists
        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists.",
                error: true,
                success: false
            });
        }

        // Validate input fields
        if (!email) {
            return res.status(400).json({
                message: "Please provide email.",
                error: true,
                success: false
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Please provide password.",
                error: true,
                success: false
            });
        }

        if (!name) {
            return res.status(400).json({
                message: "Please provide name.",
                error: true,
                success: false
            });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        // Handle any hashing error (though unlikely with bcrypt)
        if (!hashPassword) {
            return res.status(500).json({
                message: "Error hashing password.",
                error: true,
                success: false
            });
        }

        // Prepare the payload for creating the new user
        const payload = {
            ...req.body,
            role: "GENERAL",  // Default role as per the schema
            password: hashPassword,
            subscriptions: []  // Set default empty subscriptions array (can be populated later)
        };

        // Create a new user instance and save
        const userData = new userModel(payload);
        const saveUser = await userData.save();

        return res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });

    } catch (err) {
        // Handle unexpected errors
        return res.status(500).json({
            message: err.message || "Server error",
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
