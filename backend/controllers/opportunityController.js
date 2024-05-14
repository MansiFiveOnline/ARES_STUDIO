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

const getOpportunity = async (req, res) => {
  try {
    const opportunity = await opportunityModel.findById(req.params._id);

    if (opportunity.length === 0) {
      return res.status(400).json({
        message: "No opportunities are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Opportunity fetched successfully.",

      opportunity,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching opportunity due to ${error.message}`,
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
      count: opportunities.length,
      opportunities,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching opportunities due to ${error.message}`,
    });
  }
};

const deleteOpportunity = async (req, res) => {
  try {
    const opportunityExists = await opportunityModel.findById({
      _id: req.params._id,
    });

    if (opportunityExists.length === 0) {
      return res.status(400).json({
        message: "No opportunities are created. Kindly create one.",
      });
    }

    const deletedOpportunity = await opportunityModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "Opportunity deleted successfully.",
      deletedOpportunity,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting Opportunity due to ${error.message}`,
    });
  }
};

module.exports = {
  createOpportunity,
  updateOpportunity,
  getOpportunity,
  getOpportunities,
  deleteOpportunity,
};
