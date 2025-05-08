const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  planName: { type: String, required: true, trim: true }, // used for category-wise filtering
  description: { type: String },
  benefits: [{ type: String }],
  price: { type: Number, required: true },
  billingCycle: { type: String, enum: ['monthly', 'annually'], required: true }, // can be used for filtering
  category: { type: String, default: 'General' }, // NEW FIELD: helps in category-wise filtering
  hospitalId: { type: Schema.Types.ObjectId, ref: 'Hospital', default: null }, // used in populate()
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  __v: { type: Number, default: 0 }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
