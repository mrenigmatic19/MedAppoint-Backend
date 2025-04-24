const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderItemSchema = new Schema({
    itemType: { type: String, enum: ['product', 'service', 'subscription'], required: true },
    itemId: { type: Schema.Types.ObjectId, required: true, refPath: 'orderItems.itemType' },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    details: { type: Object } // Store additional details, e.g., appointment slot
});

const shippingAddressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
});

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [orderItemSchema],
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    shippingAddress: shippingAddressSchema,
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    orderStatus: { type: String, enum: ['processing', 'shipped', 'delivered', 'completed', 'cancelled'], default: 'processing' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    __v: { type: Number, default: 0 }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;