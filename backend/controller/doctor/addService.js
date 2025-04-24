const serviceModel = require("../../models/serviceModel");
const doctorModel = require("../../models/doctorModel");

async function UploadServiceController(req, res) {
    try {
        const userId = req.userId;

        // Fetch user and check if they are a doctor
        const doctor = await doctorModel.findById(userId);
        if (!doctor) {
            throw new Error("Doctor not found");
        }


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

        if (!serviceName || !Price) {
            throw new Error("Service name and base price are required");
        }

        const newService = new serviceModel({
            serviceName,
            category,
            description,
            image,
            basePrice,
            duration,
            availability,
            hospitalId: doctor.hospitalId, // Associate service with the hospital of the doctor
            doctorId: doctor._id, // Associate service with the doctor
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const savedService = await newService.save();

        res.status(201).json({
            message: "Service uploaded successfully",
            error: false,
            success: true,
            data: savedService
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || "Error uploading service",
            error: true,
            success: false
        });
    }
}

module.exports = UploadServiceController;
