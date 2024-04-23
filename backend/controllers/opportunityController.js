const opportunityModel = require("../models/opportunityModel");

const createOpportunity = async (req, res) => {
  try {
    const { title, description, responsibility, qualification } = req.body;

    const newOpportunity = new opportunityModel({
      title,
      description,
      responsibility,
      qualification,
    });

    await newOpportunity.save();

    return res.status(200).json({
      message: "Added Opportunity content sucessfully.",
      newOpportunity,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding Opportunity due to ${error.message}`,
    });
  }
};

const updateOpportunity = async (req, res) => {
  try {
    const { title, description, responsibility, qualification } = req.body;
    // let image = req.body.image;

    const updatedOpportunity = await opportunityModel.findByIdAndUpdate(
      req.params._id,
      {
        title,
        description,
        responsibility,
        qualification,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Opportunity content updated successfully.",
      updatedOpportunity,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating Opportunity due to ${error.message}`,
    });
  }
};

const getOpportunities = async (req, res) => {
  try {
    const opportunities = await opportunityModel.find();

    if (opportunities.length === 0) {
      return res.status(400).json({
        message: "No opportunities are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "All opportunities fetched successfully.",
      opportunities,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching opportunities due to ${error.message}`,
    });
  }
};

module.exports = {
  createOpportunity,
  updateOpportunity,
  getOpportunities,
};
