const Product = require("../../models/productModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q || "";
    const regex = new RegExp(query, 'ig');

    const products = await Product.find({
      $or: [
        { productName: regex },
        { category: regex }
      ]
    }).populate("hospitalId");

    res.json({
      data: products,
      message: "Search results",
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

module.exports = searchProduct;