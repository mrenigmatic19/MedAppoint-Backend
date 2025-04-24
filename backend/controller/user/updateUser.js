const userModel = require("../../models/userModel");

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;  // The user making the request
    const { userId, email, name, role, subscriptionId, subscriptionStartDate, subscriptionEndDate } = req.body;

    // Check if the session user is allowed to update the given user
    const user = await userModel.findById(sessionUser);
    
    // Only admin or the user themselves can update their information
    if (user.role !== 'ADMIN' && sessionUser !== userId) {
      return res.json({
        message: "Unauthorized action",
        success: false,
        error: true
      });
    }

    // Prepare the payload for updating user
    const payload = {
      ...(email && { email }),
      ...(name && { name }),
      ...(role && { role }),  // Role can be updated, but this should be validated
      ...(subscriptionId && { 
        subscriptions: [{
          subscriptionId: subscriptionId,
          startDate: subscriptionStartDate || Date.now(),
          endDate: subscriptionEndDate,
        }]
      })
    };

    // Ensure role update is authorized if trying to change the role
    if (role && user.role !== 'ADMIN') {
      return res.json({
        message: "You are not authorized to change roles",
        success: false,
        error: true
      });
    }

    // Find and update the user details
    const updatedUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });

    return res.json({
      data: updatedUser,
      message: "User updated successfully",
      success: true,
      error: false
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = updateUser;
