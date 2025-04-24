const Product = require("../../models/productModel");

const getCategoryProduct = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    const productByCategory = [];

    for (const category of categories) {
      const product = await Product.findOne({ category }).populate("hospitalId");
      if (product) productByCategory.push(product);
    }

    res.json({
      data: productByCategory,
      message: "Sample product from each category",
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

module.exports = getCategoryProduct;