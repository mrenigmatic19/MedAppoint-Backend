const subscriptionModel = require('../../models/subscriptionModel');
const hospitalModel = require('../../models/hospitalModel');

async function uploadSubscriptionController(req, res) {
    try {
        const UserId = req.userId;

        const user = await hospitalModelModel.findById(UserId);
        if (!user ) {
            throw new Error("Only hospital admins can upload subscriptions.");
        }
        const payload = {
            ...req.body,
            hospitalId: sessionUserId,
            createdAt : new Date(),
            updatedAt : new Date()
        };

        const subscription = new subscriptionModel(payload);
        
        const saveSub = await subscription.save();
        await hospitalModel.findByIdAndUpdate(sessionUserId, {
            $push: { subscriptionPlansOffered: saveSub._id }
        });
        
        res.status(201).json({
            message: "Subscription uploaded successfully",
            error: false,
            success: true,
            data: saveSub
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = uploadSubscriptionController;
