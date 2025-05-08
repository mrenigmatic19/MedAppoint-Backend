const hospitalModel = require("../../models/hospitalModel");

async function hospitalDetailsController(req, res) {
    try {
        const hospital = await hospitalModel.findById(req.userId);
        if (!hospital) throw new Error("Hospital not found");

        res.status(200).json({
            message: "Hospital details",
            data: hospital,
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

module.exports = hospitalDetailsController;