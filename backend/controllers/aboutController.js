const aboutModel = require("../models/aboutModel");
const path = require("path");

const createAbout = async (req, res) => {
  try {
    const { title, subtitle, description, about_description } = req.body;
    // Function to check if the file is a WebP image

    const file = req.file;
    // Check if the file is a WebP image
    // Function to check if the file is a WebP image
    const isWebPImage = (file) => {
      const extname = path.extname(file.originalname).toLowerCase();
      return extname === ".webp";
    };

    // Function to check if the file is a video
    const isVideo = (file) => {
      const extname = path.extname(file.originalname).toLowerCase();
      return [".mp4", ".avi", ".mov", ".mkv"].includes(extname);
    };

    let fileType = "";
    if (isWebPImage(file)) {
      fileType = "image";
    } else if (isVideo(file)) {
      fileType = "video";
    } else {
      return res.status(400).json({
        message:
          "Unsupported file type. Please upload a WebP image or a video file.",
      });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname;

    const newAbout = new aboutModel({
      title,
      subtitle,
      description,
      about_description,
      type: fileType,
      file: {
        name: fileName,
        path: filePath,
      },
    });

    await newAbout.save();

    return res.status(200).json({
      message: "Added About content sucessfully.",
      newAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding about due to ${error.message}`,
    });
  }
};

const updateAbout = async (req, res) => {
  try {
    const { title, subtitle, description, media, about_description } = req.body;
    // let image = req.body.image;
    const file = req.file;

    // Check if the file is a WebP image
    // Function to check if the file is a WebP image
    const isWebPImage = (file) => {
      const extname = path.extname(file.originalname).toLowerCase();
      return extname === ".webp";
    };

    // Function to check if the file is a video
    const isVideo = (file) => {
      const extname = path.extname(file.originalname).toLowerCase();
      return [".mp4", ".avi", ".mov", ".mkv"].includes(extname);
    };

    let fileType = "";
    if (isWebPImage(file)) {
      fileType = "image";
    } else if (isVideo(file)) {
      fileType = "video";
    } else {
      return res.status(400).json({
        message:
          "Unsupported file type. Please upload a WebP image or a video file.",
      });
    }

    // Check if a new image file is uploaded
    const filePath = req.file.path;
    const fileName = req.file.originalname;

    const updatedAbout = await aboutModel.findByIdAndUpdate(
      req.params._id,
      {
        title,
        subtitle,
        description,
        about_description,
        type: fileType,
        file: {
          name: fileName,
          path: filePath,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "About content updated successfully.",
      updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating about due to ${error.message}`,
    });
  }
};

module.exports = {
  createAbout,
  updateAbout,
};
