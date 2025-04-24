const Service = require("../../models/serviceModel");

const getCategoryWiseService = async (req, res) => {
  try {
    const { category } = req.body || req.query;

    const services = await Service.find({ category }).populate("hospitalId doctorId");

    res.json({
      data: services,
      message: `Services in category: ${category}`,
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

module.exports = getCategoryWiseService;
