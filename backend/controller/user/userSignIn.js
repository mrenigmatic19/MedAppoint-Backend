const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Check for missing fields
        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // Compare password with stored hash
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "Incorrect password. Please check your password",
                error: true,
                success: false
            });
        }

        // Generate JWT token
        const tokenData = {
            _id: user._id,
            email: user.email,
            role: user.role // You may want to include the role for further authorization checks
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

        // Set cookie with token
        const tokenOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        };

        // Send response with token
        return res.cookie("token", token, tokenOptions).status(200).json({
            message: "Login successful",
            data: token,
            success: true,
            error: false
        });

    } catch (err) {
        // Catch any unexpected errors
        return res.status(500).json({
            message: err.message || "Server error",
            error: true,
            success: false
        });
    }
}

module.exports = userSignInController;
