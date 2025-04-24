const Subscription = require("../../models/subscriptionModel");

const searchSubscriptionController = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, 'i');

    const subscriptions = await Subscription.find({
      $or: [
        { planName: regex },
        { description: regex }
      ]
    }).populate("hospitalId");

    res.json({
      message: "Search result",
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

module.exports = searchSubscriptionController;
