const serviceModel = require("../models/serviceModel");
const path = require("path");

const createService = async (req, res) => {
  try {
    const {
      name,
      title,
      subtitle,
      description,
      media,
      metaTitle,
      metaDescription,
    } = req.body;

    let mediaData = {};

    const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
    const url = `http:/localhost:8000/api/${urlSlug}`;

    const file = req.file;

    let fileType = "";
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
          message: "File is required for the media field.",
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

    const newService = new serviceModel({
      name,
      url,
      title,
      subtitle,
      description,
      type: fileType,
      media: mediaData,
      metaTitle,
      metaDescription,
    });

    await newService.save();

    return res.status(200).json({
      message: "Added Service content sucessfully.",
      newService,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding Service due to ${error.message}`,
    });
  }
};

// const createService = async (req, res) => {
//   try {
//     const { name, title, subtitle, media } = req.body;

//     // Construct URL based on name
//     const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//     const url = `http:/localhost:8000/api/${urlSlug}`;

//     let newService;

//     if (media === "image") {
//       // If media is an image, get file data
//       const file = req.file;
//       const { filename, path: filepath } = req.file;

//       // Create service for image
//       newService = new serviceModel({
//         name,
//         url,
//         title,
//         subtitle,
//         media: {
//           type: "image",
//           filename,
//           filepath,
//         },
//       });
//     } else if (media === "video") {
//       // If media is a video, get iframe URL
//       const { iframeUrl } = req.body;

//       // Create service for video
//       newService = new serviceModel({
//         name,
//         url,
//         title,
//         subtitle,
//         media: {
//           type: "iframe",
//           iframeUrl,
//         },
//       });
//     } else {
//       // If media type is not specified or invalid
//       return res.status(400).json({
//         message: "Invalid media type.",
//       });
//     }

//     await newService.save();

//     return res.status(200).json({
//       message: "Added Service content successfully.",
//       newService,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in adding Service due to ${error.message}`,
//     });
//   }
// };

const updateService = async (req, res) => {
  try {
    const {
      name,
      title,
      subtitle,
      description,
      media,
      metaTitle,
      metaDescription,
    } = req.body;
    // let image = req.body.image;
    const file = req.file;
    const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
    const url = `http:/localhost:8000/api/service/${urlSlug}`;
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

    const updatedService = await serviceModel.findByIdAndUpdate(
      req.params._id,
      {
        name,
        url,
        title,
        subtitle,
        description,
        type: fileType,
        media: mediaData,
        metaTitle,
        metaDescription,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Service content updated successfully.",
      updatedService,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating Service due to ${error.message}`,
    });
  }
};

const getService = async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params._id);

    if (service.length === 0) {
      return res.status(400).json({
        message: "No services are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Service fetched successfully.",
      service,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching service due to ${error.message}`,
    });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await serviceModel.find();

    if (services.length === 0) {
      return res.status(400).json({
        message: "No services are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "All services fetched successfully.",
      services,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching services due to ${error.message}`,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const serviceExists = await serviceModel.findById({
      _id: req.params._id,
    });

    if (serviceExists.length === 0) {
      return res.status(400).json({
        message: "No services are created. Kindly create one.",
      });
    }

    const deletedService = await serviceModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "Service deleted successfully.",
      deletedService,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting service due to ${error.message}`,
    });
  }
};

module.exports = {
  createService,
  updateService,
  getService,
  getServices,
  deleteService,
};
