const productModel = require("../../models/productModel");
const hospitalModel = require("../../models/hospitalModel");

async function UploadProductController(req, res) {
	try {
		const UserId = req.userId;

		// Fetch user and check role
		const user = await hospitalModel.findById(UserId);
		
		if (!user) {
			throw new Error("Only hospital can upload products");
		}        

		const {
			productName,
			brandName,
			category,
			productImage,
			description,
			price,
			sellingPrice,
			discountPercentage,
			stockQuantity
		} = req.body;

		// Mandatory field checks
		if (!productName || !price) {
			throw new Error("Product name and price are required");
		}

		const newProduct = new productModel({
			productName,
			brandName,
			category,
			productImage,
			description,
			price,
			sellingPrice,
			discountPercentage,
			stockQuantity,
			hospitalId: UserId, // Assign hospitalId from session
			createdAt: new Date(),
			updatedAt: new Date()
		});

		const saveProduct = await newProduct.save();
		await hospitalModel.findByIdAndUpdate(UserId, {
			$push: { medicalProductsOffered: saveProduct._id }
		});
		
		res.status(201).json({
			message: "Product uploaded successfully",
			error: false,
			success: true,
			data: saveProduct
		});

	} catch (err) {
		res.status(400).json({
			message: err.message || "Error uploading product",
			error: true,
			success: false
		});
	}
}

module.exports = UploadProductController;
