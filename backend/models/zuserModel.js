const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    role: { type: String, enum: ['GENERAL', 'ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR'], default: 'GENERAL' },
    subscriptions: [{
        subscriptionId: { type: Schema.Types.ObjectId, ref: 'Subscription', required: true },
        startDate: { type: Date, default: Date.now },
        endDate: { type: Date, required: true }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    __v: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);


module.exports =  User;