const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
  try {
    // Fetch user by userId from the request
    const user = await userModel.findById(req.userId).select('-password');  // Exclude password for security reasons

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });
    }

    // Return user details excluding sensitive data
    return res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details fetched successfully"
    });

  } catch (err) {
    // Internal server error if the database query fails
    return res.status(500).json({
      message: err.message || "Server Error",
      error: true,
      success: false
    });
  }
}

module.exports = userDetailsController;
