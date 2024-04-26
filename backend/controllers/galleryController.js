const galleryModel = require("../models/galleryModel");
const path = require("path");

const createGallery = async (req, res) => {
  try {
    const { service, name, isPublic = true, media } = req.body;

    let mediaData = {};
    // Function to check if the input is a URL
    const isURL = (str) => {
      try {
        new URL(str);
        return true;
      } catch (error) {
        return false;
      }
    };

    // Check if media is a URL (iframe)
    if (isURL(media)) {
      fileType = "video"; // Set fileType to "video" for iframe URLs
      mediaData = {
        filename: null,
        filepath: null,
        iframe: media.trim(),
      };
    } else {
      const file = req.file;
      if (!file) {
        return res.status(400).json({
          message:
            "Either a file or a valid URL is required for the media field.",
        });
      }
      // Check if the file is a WebP image
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
        filename: req.file.originalname,
        filepath: req.file.path,
        iframe: null,
      };
    }
    // } else {
    //   mediaData = {
    //     filename: null,
    //     filepath: null,
    //     iframe: media.trim(),
    //   };

    const newGallery = new galleryModel({
      service,
      name,
      type: fileType,
      media: mediaData,
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
    const { service, name, isPublic, media } = req.body;
    // Check if a new image file is uploaded
    // let updateFields = {
    //   service,
    //   name,
    //   isPublic,
    //   media,
    // };
    const file = req.file;

    let fileType = "";

    let mediaData = {};

    // Function to check if the input is a URL
    const isURL = (str) => {
      try {
        new URL(str);
        return true;
      } catch (error) {
        return false;
      }
    };

    // Check if media is a URL (iframe)
    if (isURL(media)) {
      fileType = "video"; // Set fileType to "video" for iframe URLs
      mediaData = {
        filename: null,
        filepath: null,
        iframe: media.trim(),
      };
    } else {
      const file = req.file;
      if (!file) {
        return res.status(400).json({
          message:
            "Either a file or a valid URL is required for the media field.",
        });
      }
      // Check if the file is a WebP image
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
        filename: req.file.originalname,
        filepath: req.file.path,
        iframe: null,
      };
    }

    // updateFields = {
    //   ...updateFields,
    //   type: fileType,
    // };
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
        service,
        name,
        type: fileType,
        isPublic,
        media: mediaData,
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

const getGallery = async (req, res) => {
  try {
    const gallery = await galleryModel.findById(req.params._id);

    if (gallery.length === 0) {
      return res.status(400).json({
        message: "No gallery is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Gallery fetched successfully.",
      gallery,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching gallery due to ${error.message}`,
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

const deleteGallery = async (req, res) => {
  try {
    const galleryExists = await galleryModel.findById({
      _id: req.params._id,
    });

    if (galleryExists.length === 0) {
      return res.status(400).json({
        message: "No gallery are created. Kindly create one.",
      });
    }

    const deletedGallery = await galleryModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "Gallery deleted successfully.",
      deletedGallery,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting gallery due to ${error.message}`,
    });
  }
};

const getGalleryNames = async (req, res) => {
  try {
    const { service } = req.query;
    const gallery = await galleryModel.find({ service });
    res.status(200).json({
      message: "Gallery names fetched successfully",
      gallery,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error is fetching gallery names due to ${error.message}`,
    });
  }
};

module.exports = {
  createGallery,
  updateGallery,
  getGallery,
  getGalleries,
  deleteGallery,
  getGalleryNames,
};
