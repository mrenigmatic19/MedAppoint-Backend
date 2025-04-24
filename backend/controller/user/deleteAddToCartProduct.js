const Cart = require("../../models/cartProduct");

const deleteAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const { productId, servicesId, subscriptionId } = req.body; // Ensure the request body includes productId, servicesId, or subscriptionId

    let itemId = null;
    let itemType = null;

    // Determine which type of item to delete: product, service, or subscription
    if (productId) {
      itemId = productId;
      itemType = 'product';
    } else if (servicesId) {
      itemId = servicesId;
      itemType = 'service';
    } else if (subscriptionId) {
      itemId = subscriptionId;
      itemType = 'subscription';
    }

    // Find the user's cart
    const existingCart = await Cart.findOne({ userId: currentUserId });

    if (!existingCart) {
      return res.json({
        message: "Cart not found",
        success: false,
        error: true
      });
    }

    // Check if the item exists in the cart
    const itemIndex = existingCart.orderItems.findIndex(
      (item) => String(item.itemId) === String(itemId) && item.itemType === itemType
    );

    if (itemIndex === -1) {
      return res.json({
        message: "Item not found in the cart",
        success: false,
        error: true
      });
    }

    // Remove the item from the orderItems array
    const itemToDelete = existingCart.orderItems[itemIndex];
    existingCart.orderItems.splice(itemIndex, 1);

    // Adjust the total price after removing the item
    existingCart.totalPrice -= itemToDelete.price * itemToDelete.quantity;

    // Save the updated cart
    await existingCart.save();

    return res.json({
      message: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} removed from cart`,
      success: true,
      error: false,
      data: existingCart
    });

  } catch (err) {
    return res.status(500).json({
      message: err?.message || "Server Error",
      success: false,
      error: true
    });
  }
};

module.exports = deleteAddToCartProduct;
