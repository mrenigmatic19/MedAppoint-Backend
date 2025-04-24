const Product = require("../../models/productModel");

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId).populate("hospitalId");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
        error: true
      });
    }

    res.json({
      data: product,
      message: "Product details",
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

module.exports = getProductDetails;