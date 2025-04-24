const Subscription = require("../../models/subscriptionModel");

const filterSubscriptionController = async (req, res) => {
  try {
    const categoryList = req.body.planNames || [];

    const subscriptions = await Subscription.find({
      planName: { $in: categoryList }
    }).populate("hospitalId");

    res.json({
      data: subscriptions,
      message: "Filtered subscriptions by plan name",
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

module.exports = filterSubscriptionController;
