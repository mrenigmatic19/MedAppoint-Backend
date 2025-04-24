async function hospitalLogout(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });

        res.status(200).json({
            message: "Hospital logged out successfully",
            success: true,
            error: false,
            data: []
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        });
    }
}
module.exports = hospitalLogout;