const Cart = require("../../models/cartProduct");  // Assuming the cart model is named "Cart"

const addToCartController = async (req, res) => {
  try {
    const { productId, servicesId, subscriptionId } = req?.body;
    const currentUser = req.userId;

    // Prepare the item object based on the provided ID type
    let item = null;
    let itemType = null;

    // Check if it's a product, service, or subscription
    if (productId) {
      item = productId;
      itemType = 'product';
    } else if (servicesId) {
      item = servicesId;
      itemType = 'service';
    } else if (subscriptionId) {
      item = subscriptionId;
      itemType = 'subscription';
    }

    // Check if the item already exists in the cart for the user
    const existingCart = await Cart.findOne({ userId: currentUser });

    if (existingCart) {
      const existingItem = existingCart.orderItems.find((orderItem) => 
        String(orderItem.itemId) === String(item) && orderItem.itemType === itemType
      );

      if (existingItem) {
        return res.json({
          message: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} already exists in the cart`,
          success: false,
          error: true
        });
      }
    }

    // Prepare the order item based on the provided ID and type
    const orderItem = {
      itemType,
      itemId: item,
      quantity: 1, // Only allow 1 quantity per product/service/subscription
      price: req.body.price, // Price needs to be passed in the request body for accurate total calculation
    };

    // If no cart exists for the user, create a new cart entry
    if (!existingCart) {
      const newCart = new Cart({
        userId: currentUser,
        orderItems: [orderItem],
        totalPrice: orderItem.price,  // Initial total price for the cart
      });
      await newCart.save();

      return res.json({
        data: newCart,
        message: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} added to cart`,
        success: true,
        error: false
      });
    }

    // If cart exists, update the cart with the new item
    existingCart.orderItems.push(orderItem);
    existingCart.totalPrice += orderItem.price;  // Update the total price
    await existingCart.save();

    return res.json({
      data: existingCart,
      message: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} added to cart`,
      success: true,
      error: false
    });

  } catch (err) {
    return res.status(500).json({
      message: err?.message || "Server Error",
      success: false,
      error: true
    });
  }
};

module.exports = addToCartController;
