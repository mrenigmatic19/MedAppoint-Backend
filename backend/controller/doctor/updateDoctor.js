const doctorModel = require("../../models/doctorModel");

async function doctorUpdateDetailsController(req, res) {
    try {
        const { _id, ...updateData } = req.body;

        if (!_id) {
            throw new Error("Doctor ID is required for update");
        }

        const updatedDoctor = await doctorModel.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedDoctor) {
            throw new Error("Doctor not found or update failed");
        }

        res.status(200).json({
            message: "Doctor details updated successfully",
            data: updatedDoctor,
            success: true,
            error: false,
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = doctorUpdateDetailsController;
