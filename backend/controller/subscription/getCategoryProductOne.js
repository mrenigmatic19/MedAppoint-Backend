const Subscription = require("../../models/subscriptionModel");

const getSampleSubscriptionsFromEachCategory = async (req, res) => {
  try {
    const planNames = await Subscription.distinct("planName");
    const sampleSubscriptions = [];

    for (const planName of planNames) {
      const subscription = await Subscription.findOne({ planName }).populate("hospitalId");
      if (subscription) sampleSubscriptions.push(subscription);
    }

    res.json({
      data: sampleSubscriptions,
      message: "Sample subscription from each plan name",
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

module.exports = getSampleSubscriptionsFromEachCategory;
