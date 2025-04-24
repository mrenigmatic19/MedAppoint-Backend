const Service = require("../../models/serviceModel");

const getAllServicesController = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 }).populate("hospitalId doctorId");

    res.json({
      data: services,
      message: "All services",
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

module.exports = getAllServicesController;
