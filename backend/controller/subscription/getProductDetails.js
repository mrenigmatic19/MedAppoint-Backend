const Subscription = require("../../models/subscriptionModel");

const getSubscriptionDetailsController = async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    const subscription = await Subscription.findById(subscriptionId).populate("hospitalId");

    res.json({
      message: "Subscription details",
      data: subscription,
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

module.exports = getSubscriptionDetailsController;
