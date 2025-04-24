const Cart = require("../../models/cartProduct");  // Assuming the cart model is named "Cart"

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.userId;

    // Find the cart for the current user
    const cart = await Cart.findOne({ userId: currentUser }).populate({
      path: 'orderItems.itemId',
      populate: [
        { path: 'productId', model: 'Product' },        // Populating product details
        { path: 'servicesId', model: 'Service' },        // Populating service details
        { path: 'subscriptionId', model: 'Subscription' },  // Populating subscription details
      ]
    });

    if (!cart) {
      return res.json({
        message: "No cart found for the user",
        success: false,
        error: true
      });
    }

    // Return cart details with populated items
    res.json({
      data: cart,
      success: true,
      error: false
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = addToCartViewProduct;
