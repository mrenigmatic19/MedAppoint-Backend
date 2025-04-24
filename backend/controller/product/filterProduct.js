const Product = require("../../models/productModel");

const filterProductController = async (req, res) => {
  try {
    const categoryList = req.body.category || [];

    const products = await Product.find({
      category: { $in: categoryList }
    }).populate("hospitalId");

    res.json({
      data: products,
      message: "Filtered products by category",
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

module.exports = filterProductController;