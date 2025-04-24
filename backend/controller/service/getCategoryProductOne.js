const Service = require("../../models/serviceModel");

const getSampleServicesFromEachCategory = async (req, res) => {
  try {
    const categories = await Service.distinct("category");
    const sampleServices = [];

    for (const category of categories) {
      const service = await Service.findOne({ category }).populate("hospitalId doctorId");
      if (service) sampleServices.push(service);
    }

    res.json({
      data: sampleServices,
      message: "Sample service from each category",
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

module.exports = getSampleServicesFromEachCategory;