const galleryModel = require("../models/galleryModel");
const path = require("path");

const createGallery = async (req, res) => {
  try {
    const { service, name, isPublic = true } = req.body;

    const filePath = req.file.path;
    const fileName = req.file.originalname;
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
    const newGallery = new galleryModel({
      service,
      name,
      type: fileType,
      file: {
        name: fileName,
        path: filePath,
      },
      isPublic,
    });

    await newGallery.save();

    return res.status(200).json({
      message: "Added Gallery content sucessfully.",
      newGallery,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding Gallery due to ${error.message}`,
    });
  }
};

const updateGallery = async (req, res) => {
  try {
    const { service, name, isPublic } = req.body;
    // Check if a new image file is uploaded
    let updateFields = {
      service,
      name,
      isPublic,
    };
    if (req.file) {
      // Check if a new image file is uploaded
      const filePath = req.file.path;
      const fileName = req.file.originalname;

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
      updateFields = {
        ...updateFields,
        type: fileType,
        file: {
          name: fileName,
          path: filePath,
        },
      };
    }
    const updatedGallery = await galleryModel.findByIdAndUpdate(
      req.params._id,
      {
        // service,
        // name,
        // type: fileType,
        // file: {
        //   name: fileName,
        //   path: filePath,
        // },
        updateFields,
        isPublic,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Gallery content updated successfully.",
      updatedGallery,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating Gallery due to ${error.message}`,
    });
  }
};

const getGalleries = async (req, res) => {
  try {
    const galleries = await galleryModel.find();

    if (galleries.length === 0) {
      return res.status(400).json({
        message: "No galleries are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "All galleries fetched successfully.",
      galleries,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching galleries due to ${error.message}`,
    });
  }
};

module.exports = { createGallery, updateGallery, getGalleries };
