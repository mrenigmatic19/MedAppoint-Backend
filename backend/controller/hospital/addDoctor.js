const doctorModel = require("../../models/doctorModel");
const bcrypt = require("bcrypt");
async function addDoctorController(req, res) {
    try {
        const {
            firstName,
            lastName,
            specialization,
            experienceYears,
            qualifications,
            contactNumber,
            email,
            availability,
            hospitalId
        } = req.body;

        if (!firstName || !lastName || !specialization || !experienceYears || !contactNumber || !email || !hospitalId || !availability) {
            throw new Error("Please provide all required fields.");
        }

        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            throw new Error("Doctor already exists with this email.");
        }
        const salt = bcrypt.genSaltSync(10);
         const hashedPassword = await bcrypt.hashSync(email, salt);
        const doctor = new doctorModel({
            firstName,
            lastName,
            specialization,
            experienceYears,
            qualifications,
            password:hashedPassword,
            contactNumber,
            email,
            hospitalId,
            availability
        });

        const savedDoctor = await doctor.save();

        res.status(201).json({
            message: "Doctor added successfully",
            data: savedDoctor,
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

module.exports = addDoctorController;
