const doctorModel = require("../../models/doctorModel");

async function doctorDetailsController(req, res) {
    try {
        console.log("doctorId", req.userId);
        const doctor = await doctorModel.findById(req.userId);

        if (!doctor) {
            throw new Error("Doctor not found");
        }

        res.status(200).json({
            data: doctor,
            error: false,
            success: true,
            message: "Doctor details retrieved successfully",
        });

        console.log("doctor", doctor);

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = doctorDetailsController;
