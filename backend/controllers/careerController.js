const careerModel = require("../models/careerModel");
const path = require("path");

const createCareer = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
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

    const newCareer = new careerModel({
      title,
      subtitle,
      type: fileType,
      file: {
        name: fileName,
        path: filePath,
      },
    });

    await newCareer.save();

    return res.status(200).json({
      message: "Added Career content sucessfully.",
      newCareer,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding career due to ${error.message}`,
    });
  }
};

const updateCareer = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
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

    const updatedCareer = await careerModel.findByIdAndUpdate(
      req.params._id,
      {
        title,
        subtitle,
        type: fileType,
        file: {
          name: fileName,
          path: filePath,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Career content updated successfully.",
      updatedCareer,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating Career due to ${error.message}`,
    });
  }
};

const getCareers = async (req, res) => {
  try {
    const careers = await careerModel.find();

    if (careers.length === 0) {
      return res.status(400).json({
        message: "No careers are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "All careers fetched successfully.",
      careers,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching careers due to ${error.message}`,
    });
  }
};

module.exports = { createCareer, updateCareer, getCareers };
