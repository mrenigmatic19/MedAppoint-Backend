const Subscription = require("../../models/subscriptionModel");

const getAllSubscriptionsController = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate("hospitalId");

    res.json({
      message: "All Subscriptions",
      data: subscriptions,
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

module.exports = getAllSubscriptionsController;
