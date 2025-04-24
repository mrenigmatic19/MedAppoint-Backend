const Service = require("../../models/serviceModel");

const searchServiceController = async (req, res) => {
  try {
    const query = req.query.q || "";
    const regex = new RegExp(query, "ig");

    const services = await Service.find({
      $or: [
        { serviceName: regex },
        { category: regex }
      ]
    }).populate("hospitalId doctorId");

    res.json({
      data: services,
      message: "Search service results",
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

module.exports = searchServiceController;
