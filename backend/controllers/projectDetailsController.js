const path = require("path");
const projectDetailsModel = require("../models/projectDetailsModel");

const createProjectDetail = async (req, res) => {
  try {
    const { project_name, media } = req.body;

    // Function to check if the input is a URL
    const isURL = (str) => {
      try {
        new URL(str);
        return true;
      } catch (error) {
        return false;
      }
    };

    // Process media inputs
    let mediaData = [];

    // Check if media is an array and process each entry
    if (Array.isArray(media)) {
      media.forEach((item) => {
        if (isURL(item)) {
          mediaData.push({
            type: "video",
            filename: null,
            filepath: null,
            iframe: item.trim(),
          });
        }
      });
    } else {
      // Handle single media input
      if (isURL(media)) {
        mediaData.push({
          type: "video",
          filename: null,
          filepath: null,
          iframe: media.trim(),
        });
      }
    }

    // Process uploaded files
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const isWebPImage = (file) => {
          const extname = path.extname(file.originalname).toLowerCase();
          return extname === ".webp";
        };

        if (!isWebPImage(file)) {
          return res.status(400).json({
            message: "Unsupported file type. Please upload a WebP image.",
          });
        }

        mediaData.push({
          type: "image",
          filename: file.originalname,
          filepath: file.path,
          iframe: null,
        });
      });
    }

    if (mediaData.length === 0) {
      return res.status(400).json({
        message: "At least one media input (file or URL) is required.",
      });
    }

    const newProjectDetail = new projectDetailsModel({
      project_name,
      media: mediaData,
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
    const projectId = req.params._id;
    const { project_name } = req.body;
    let mediaData = null;

    // Find the project detail by ID
    let projectDetail = await projectDetailsModel.findById(projectId);
    if (!projectDetail) {
      return res.status(404).json({ message: "Project detail not found." });
    }

    // Update project name if provided
    if (project_name) {
      projectDetail.project_name = project_name;
    }

    // Process media updates
    if (req.file) {
      // Function to check if the input is a URL
      const isURL = (str) => {
        try {
          new URL(str);
          return true;
        } catch (error) {
          return false;
        }
      };

      // Check if media is an array and process each entry
      if (Array.isArray(req.body.media)) {
        media.forEach((item) => {
          if (isURL(item)) {
            mediaData.push({
              type: "video",
              filename: null,
              filepath: null,
              iframe: item.trim(),
            });
          }
        });
      } else {
        // Handle single media input
        if (isURL(req.body.media)) {
          mediaData.push({
            type: "video",
            filename: null,
            filepath: null,
            iframe: media.trim(),
          });
        }
      }

      // Process uploaded files
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          const isWebPImage = (file) => {
            const extname = path.extname(file.originalname).toLowerCase();
            return extname === ".webp";
          };

          if (!isWebPImage(file)) {
            return res.status(400).json({
              message: "Unsupported file type. Please upload a WebP image.",
            });
          }

          mediaData.push({
            type: "image",
            filename: file.originalname,
            filepath: file.path,
            iframe: null,
          });
        });
      }

      // Update project media
      projectDetail.media = mediaData;
    }

    // Save the updated project detail
    await projectDetail.save();

    return res.status(200).json({
      message: "Project details updated successfully.",
      updatedProjectDetail: projectDetail,
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
