const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema({
    serviceName: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    sellingPrice: { type: Number },
    duration: { type: String },
    availability: { type: Object }, 
    hospitalId: { type: Schema.Types.ObjectId, ref: 'Hospital' }, 
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    __v: { type: Number, default: 0 }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;