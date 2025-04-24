const Product = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req.body || req.query;

    const products = await Product.find({ category }).populate("hospitalId");

    res.json({
      data: products,
      message: `Products in category: ${category}`,
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

module.exports = getCategoryWiseProduct;