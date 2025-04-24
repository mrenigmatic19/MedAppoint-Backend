const Service = require("../../models/serviceModel");

const getServiceDetails = async (req, res) => {
  try {
    const { serviceId } = req.body;

    const service = await Service.findById(serviceId).populate("hospitalId doctorId");

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
        success: false,
        error: true
      });
    }

    res.json({
      data: service,
      message: "Service details",
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

module.exports = getServiceDetails;