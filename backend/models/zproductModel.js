const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    productName: { type: String, required: true },
    brandName: { type: String },
    category: { type: String },
    productImage: [{ type: String }],
    description: { type: String },
    price: { type: Number, required: true },
    sellingPrice: { type: Number },
    discountPercentage: { type: Number },
    stockQuantity: { type: Number, default: 0 },
    hospitalId: { type: Schema.Types.ObjectId, ref: 'Hospital' }, // Reference to Hospital
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    __v: { type: Number, default: 0 }
});

const productModel = mongoose.model('Product', productSchema);

module.exports =    productModel;