const serviceModel = require("../../models/serviceModel");  // Assuming the Service model is stored in a 'serviceModel.js'

async function allServicesByDoctor(req, res) {
    try {
        
        const doctorId = req.userId;
        
        const allServices = await serviceModel.find({ doctorId: doctorId });

        if (allServices.length === 0) {
            return res.status(404).json({
                message: "No services found for this doctor",
                success: false,
                error: true
            });
        }

        res.status(200).json({
            message: "All services uploaded by the doctor",
            data: allServices,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = allServicesByDoctor;
