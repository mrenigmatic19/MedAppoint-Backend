const productModel = require('../../models/productModel');
const userModel = require('../../models/userModel');
const hospitalModel = require('../../models/hospitalModel');

async function updateProductController(req, res) {
    try {
        const UserId = req.userId;

        // Check if user is HOSPITAL_ADMIN
        const user = await hospitalModelModel.findById(UserId);
        if (!user || user.role !== "HOSPITAL_ADMIN") {
            throw new Error("Permission denied. Only hospital admin can update product.");
        }

        const { _id, ...resBody } = req.body;

        if (!_id) {
            throw new Error("Product ID is required");
        }

        const existingProduct = await productModel.findById(_id);
        if (!existingProduct) {
            throw new Error("Product not found");
        }

        // Ensure the product belongs to the hospital admin trying to update
        if (existingProduct.hospitalId.toString() !== UserId.toString()) {
            throw new Error("You are not authorized to update this product");
        }

        // Allowed fields to update
        const allowedFields = [
            'productName', 'brandName', 'category', 'productImage',
            'description', 'price', 'sellingPrice', 'discountPercentage', 'stockQuantity'
        ];

        const updatePayload = {};
        for (const key of allowedFields) {
            if (key in resBody) {
                updatePayload[key] = resBody[key];
            }
        }

        updatePayload.updatedAt = new Date();

        const updatedProduct = await productModel.findByIdAndUpdate(
            _id,
            updatePayload,
            { new: true }
        );

        res.json({
            message: "Product updated successfully",
            data: updatedProduct,
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

module.exports = updateProductController;
