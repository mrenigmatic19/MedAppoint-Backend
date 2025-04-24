async function userLogout(req, res) {
    try {
        // Options for clearing the cookie
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        };

        // Clear the token cookie
        res.clearCookie("token", tokenOption);

        // Send success response
        res.status(200).json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        });
    } catch (err) {
        // In case of an error, return a 500 status
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = userLogout;
