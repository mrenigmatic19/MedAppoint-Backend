const Service = require("../../models/serviceModel");

const filterServiceController = async (req, res) => {
  try {
    const categoryList = req.body.category || [];

    const services = await Service.find({
      category: { $in: categoryList }
    }).populate("hospitalId doctorId");

    res.json({
      data: services,
      message: "Filtered services by category",
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

module.exports = filterServiceController;
