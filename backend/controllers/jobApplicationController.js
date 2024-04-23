const jobApplicationModel = require("../models/jobApplicationModel");

const getApplications = async (req, res) => {
  try {
    const applications = await jobApplicationModel.find();

    return res.status(200).json({
      message: "Applications retrieved successfully.",
      applications: applications,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching applications: ${error.message}`,
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;

    const application = await jobApplicationModel.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    await jobApplicationModel.findByIdAndDelete(applicationId);

    return res.status(200).json({
      message: "Application deleted successfully.",
      deletedApplication: application,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting application: ${error.message}`,
    });
  }
};

module.exports = { getApplications, deleteApplication };
