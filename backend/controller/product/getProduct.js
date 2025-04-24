const Product = require("../../models/productModel");

const getProductController = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).populate("hospitalId");

    res.json({
      data: products,
      message: "All products",
      success: true,
      error: false
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Server Error",
      success: false,
      error: true
    });
  }
};

module.exports = getProductController;