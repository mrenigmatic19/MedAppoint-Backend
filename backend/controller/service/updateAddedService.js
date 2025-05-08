const serviceModel = require("../../models/serviceModel");
const doctorModel = require("../../models/doctorModel");

async function UpdateServiceController(req, res) {
    try {
        const userId = req.userId;

      

        const doctor = await doctorModel.findOne({ userId });
        if (!doctor) {
            throw new Error("Only doctors can update services");
        }

        const { serviceId } = req.params; // Get the service ID from URL params
        const {
            serviceName,
            category,
            description,
            image,
            Price,
            sellingPrice,
            duration,
            availability
        } = req.body;

        // Find the service by ID and check if it exists
        const service = await serviceModel.findById(serviceId);
        if (!service) {
            throw new Error("Service not found");
        }

        // Ensure the service is associated with the doctor
        if (service.doctorId.toString() !== doctor._id.toString()) {
            throw new Error("You can only update your own services");
        }

        // Update the service fields
        service.serviceName = serviceName || service.serviceName;
        service.category = category || service.category;
        service.description = description || service.description;
        service.image = image || service.image;
        service.Price = Price || service.Price;
        service.sellingPrice = sellingPrice || service.sellingPrice;
        service.duration = duration || service.duration;
        service.availability = availability || service.availability;
        service.updatedAt = new Date(); // Update the timestamp

        // Save the updated service
        const updatedService = await service.save();

        res.status(200).json({
            message: "Service updated successfully",
            error: false,
            success: true,
            data: updatedService
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || "Error updating service",
            error: true,
            success: false
        });
    }
}

module.exports = UpdateServiceController;
