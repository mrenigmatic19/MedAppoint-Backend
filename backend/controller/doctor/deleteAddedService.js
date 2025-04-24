const serviceModel = require("../../models/serviceModel");
const userModel = require("../../models/userModel");
const doctorModel = require("../../models/doctorModel");

async function DeleteServiceController(req, res) {
    try {
        const UserId = req.userId;

        // Fetch user and check if they are a doctor
        const doctor = await doctorModel.findById(UserId);
      
        if (!doctor) {
            throw new Error("Only doctors can delete services");
        }

        const { serviceId } = req.params; // Get the service ID from URL params

        // Find the service by ID and check if it exists
        const service = await serviceModel.findById(serviceId);
        if (!service) {
            throw new Error("Service not found");
        }

        // Ensure the service is associated with the doctor
        if (service.doctorId.toString() !== doctor._id.toString()) {
            throw new Error("You can only delete your own services");
        }

        // Delete the service
        await serviceModel.findByIdAndDelete(serviceId);

        res.status(200).json({
            message: "Service deleted successfully",
            error: false,
            success: true
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || "Error deleting service",
            error: true,
            success: false
        });
    }
}

module.exports = DeleteServiceController;
