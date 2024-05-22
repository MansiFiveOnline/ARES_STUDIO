const path = require("path");
const projectDetailsModel = require("../models/projectDetailsModel");

const createProjectDetail = async (req, res) => {
  try {
    const { project_name } = req.body;
    let mediaData = {};
    let fileType = "";

    const file = req.file;
    const media = req.body.media;

    // Function to check if the input is a URL
    const isURL = (str) => {
      try {
        new URL(str);
        return true;
      } catch (error) {
        return false;
      }
    };

    if (isURL(media)) {
      fileType = "video"; // Set fileType to "video" for iframe URLs
      mediaData = {
        filename: null,
        filepath: null,
        iframe: media.trim(),
      };
    } else if (file) {
      // A file is provided
      const isWebPImage = (file) => {
        const extname = path.extname(file.originalname).toLowerCase();
        return extname === ".webp";
      };

      if (!isWebPImage(file)) {
        return res.status(400).json({
          message: "Unsupported file type. Please upload a WebP image.",
        });
      }

      fileType = "image";
      mediaData = {
        filename: file.originalname,
        filepath: file.path,
        iframe: null,
      };
    } else {
      // Handle the case where neither media nor file is provided
      return res.status(400).json({
        message: "Please provide either an iFrame URL or an image.",
      });
    }

    const newProjectDetail = new projectDetailsModel({
      project_name,
      media: mediaData,
      type: fileType, // Add the type property here
    });

    await newProjectDetail.save();

    return res.status(200).json({
      message: "Added project details successfully.",
      newProjectDetail,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding project details due to ${error.message}`,
    });
  }
};

const updateProjectDetail = async (req, res) => {
  try {
    const { project_name } = req.body;
    let mediaData = null;

    if (req.file) {
      const isWebPImage = (file) => {
        const extname = path.extname(file.originalname).toLowerCase();
        return extname === ".webp";
      };

      if (!isWebPImage(req.file)) {
        return res.status(400).json({
          message: "Unsupported file type. Please upload a WebP image.",
        });
      }

      mediaData = {
        filename: req.file.originalname,
        filepath: req.file.path,
        iframe: null,
      };
    } else if (req.body.media) {
      const isURL = (str) => {
        try {
          new URL(str);
          return true;
        } catch (error) {
          return false;
        }
      };

      if (!isURL(req.body.media)) {
        return res.status(400).json({
          message: "Invalid media URL.",
        });
      }

      mediaData = {
        filename: null,
        filepath: null,
        iframe: req.body.media.trim(),
      };
    }

    const updatedFields = {
      project_name,
    };

    if (mediaData) {
      updatedFields.media = mediaData;
      updatedFields.type = mediaData.filename ? "image" : "video";
    }

    const updatedProjectDetail = await projectDetailsModel.findByIdAndUpdate(
      req.params._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Project details updated successfully.",
      updatedProjectDetail,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating project details: ${error.message}`,
    });
  }
};
const getProjectDetails = async (req, res) => {
  try {
    const projectDetails = await projectDetailsModel.find();

    if (projectDetails.length === 0) {
      return res.status(400).json({
        message: "No project details are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "All project details fetched successfully.",
      count: projectDetails.length,
      projectDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching project details due to ${error.message}`,
    });
  }
};

const getProjectDetail = async (req, res) => {
  try {
    const projectDetail = await projectDetailsModel.findById(req.params._id);
    console.log(req.params._id);
    if (!projectDetail) {
      return res.status(400).json({
        message: "No project detail is created with this id.",
      });
    }

    return res.status(200).json({
      message: "project detail fetched successfully.",
      projectDetail,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching project detail due to ${error.message}`,
    });
  }
};

const deleteProjectDetail = async (req, res) => {
  try {
    const projectDetailExists = await projectDetailsModel.findById({
      _id: req.params._id,
    });

    if (projectDetailExists.length === 0) {
      return res.status(400).json({
        message: "No project details are created. Kindly create one.",
      });
    }

    const deletedProjectDetail = await projectDetailsModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "project detail deleted successfully.",
      deletedProjectDetail,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting project detail due to ${error.message}`,
    });
  }
};

module.exports = {
  createProjectDetail,
  updateProjectDetail,
  getProjectDetails,
  getProjectDetail,
  deleteProjectDetail,
};
