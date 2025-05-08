
const hospitalModel = require("../../models/hospitalModel");
async function hospitalSignInController(req, res) {
    try {
        const { email, password } = req.body;

        const hospital = await hospitalModel.findOne({ email });
        if (!hospital) throw new Error("Hospital not found.");

        const isMatch = await bcrypt.compare(password, hospital.password);
        if (!isMatch) throw new Error("Invalid credentials.");

        const token = jwt.sign({ _id: hospital._id, email: hospital.email }, process.env.TOKEN_SECRET_KEY, { expiresIn: "8h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }).status(200).json({
            message: "Hospital logged in successfully",
            data: token,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        });
    }
}

module.exports = hospitalSignInController;