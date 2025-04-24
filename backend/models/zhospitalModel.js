const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define the Hospital Schema
const hospitalSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String },
    contactNumber: { type: String },
    password: { type: String, required: true },
    servicesOffered: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    medicalProductsOffered: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    subscriptionPlansOffered: [{ type: Schema.Types.ObjectId, ref: 'Subscription' }], // Array of Subscription IDs
    smartContractAddress: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    __v: { type: Number, default: 0 }
});

// Create the Hospital model
const hospitalModel = mongoose.model('Hospital', hospitalSchema);

// Export the Hospital model
module.exports = hospitalModel;