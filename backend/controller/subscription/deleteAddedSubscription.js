const subscriptionModel = require('../../models/subscriptionModel');
const userModel = require('../../models/userModel');
const hospitalModel = require('../../models/hospitalModel');

async function deleteSubscriptionController(req, res) {
    try {
        const UserId = req.userId;
        const { subscriptionId } = req.params;

        if (!subscriptionId) {
            throw new Error("Subscription ID is required");
        }

        const subscription = await subscriptionModel.findById(subscriptionId);
        if (!subscription) {
            throw new Error("Subscription not found");
        }

        // Ensure the subscription belongs to the same hospital
        if (subscription.hospitalId && subscription.hospitalId.toString() !== UserId.toString()) {
            throw new Error("You are not authorized to delete this subscription");
        }
        await hospitalModel.findByIdAndUpdate(sessionUserId, {
            $pull: { subscriptionPlansOfferedOffered: subscriptionId }
        });
        
        await subscriptionModel.findByIdAndDelete(subscriptionId);

        res.json({
            message: "Subscription deleted successfully",
            success: true,
            error: false,
            data: []
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        });
    }
}

module.exports = deleteSubscriptionController;
