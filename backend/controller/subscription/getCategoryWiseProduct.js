const Subscription = require("../../models/subscriptionModel");

const getCategoryWiseSubscription = async (req, res) => {
  try {
    const { planName } = req.body || req.query;

    const subscriptions = await Subscription.find({ planName }).populate("hospitalId");

    res.json({
      data: subscriptions,
      message: `Subscriptions in plan name: ${planName}`,
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

module.exports = getCategoryWiseSubscription;
