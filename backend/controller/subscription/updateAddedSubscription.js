const subscriptionModel = require('../../models/subscriptionModel');
const userModel = require('../../models/userModel');
const hospitalModel = require('../../models/hospitalModel');

async function updateSubscriptionController(req, res) {
    try {
        const UserId = req.userId;
        const { subscriptionId, ...resBody } = req.body;

        if (!subscriptionId) {
            throw new Error("Subscription ID is required");
        }

        const user = await hospitalModel.findById(UserId);
        if (!user || user.role !== "HOSPITAL_ADMIN") {
            throw new Error("Permission denied. Only hospital admin can update subscription.");
        }

        const existingSubscription = await subscriptionModel.findById(subscriptionId);
        if (!existingSubscription) {
            throw new Error("Subscription not found");
        }

        // Ensure the subscription belongs to the hospital admin trying to update
        if (existingSubscription.hospitalId?.toString() !== UserId.toString()) {
            throw new Error("You are not authorized to update this subscription");
        }

        // Allowed fields to update
        const allowedFields = [
            'planName', 'planType', 'price', 'duration', 'features', 'status', 'startDate', 'endDate'
        ];

        const updatePayload = {};
        for (const key of allowedFields) {
            if (key in resBody) {
            updatePayload[key] = resBody[key];
            }
        }

        updatePayload.updatedAt = new Date();

        const updatedSubscription = await subscriptionModel.findByIdAndUpdate(
            subscriptionId,
            updatePayload,
            { new: true }
        );

        res.json({
            message: "Subscription updated successfully",
            data: updatedSubscription,
            success: true,
            error: false
        });


    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = deleteSubscriptionController;
