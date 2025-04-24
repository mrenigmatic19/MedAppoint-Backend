const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialization: { type: String, required: true }, // Doctor's specialization (e.g., cardiology, orthopedics, etc.)
  experienceYears: { type: Number, required: true }, // Number of years of experience
  qualifications: [{ type: String }], // List of qualifications
  contactNumber: { type: String, required: true }, // Doctor's contact number
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Doctor's email (unique)
  hospitalId: { type: Schema.Types.ObjectId, ref: 'Hospital', required: true }, // Reference to the Hospital they are associated with
  availability: {
    days: [{ type: String }], // Days the doctor is available (e.g., ["Monday", "Wednesday"])
    timings: { type: String } // Timings of availability (e.g., "9 AM - 5 PM")
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  __v: { type: Number, default: 0 }
});

module.exports = mongoose.model('Doctor', doctorSchema);
