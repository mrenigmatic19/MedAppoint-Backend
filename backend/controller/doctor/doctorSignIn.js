const bcrypt = require('bcryptjs');
const doctorModel = require('../../models/doctorModel');  // Assuming you have a separate doctor model
const jwt = require('jsonwebtoken');

async function doctorSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            throw new Error("Doctor not found");
        }

        const checkPassword = await bcrypt.compare(password, doctor.password);

        if (checkPassword) {
            const tokenData = {
                _id: doctor._id,
                email: doctor.email,
            };
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
            };

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false,
            });
        } else {
            throw new Error("Invalid password");
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = doctorSignInController;
