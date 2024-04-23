const serviceModel = require("../models/serviceModel");
const path = require("path");

const createService = async (req, res) => {
  try {
    const { name, title, subtitle, description } = req.body;

    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
    const url = `http:/localhost:8000/api/${urlSlug}`;

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

    const newService = new serviceModel({
      name,
      url,
      title,
      subtitle,
      description,
      type: fileType,
      file: {
        name: fileName,
        path: filePath,
      },
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
    const { name, title, subtitle, description } = req.body;
    // let image = req.body.image;
    const file = req.file;
    const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
    const url = `http:/localhost:8000/api/service/${urlSlug}`;
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

    const updatedService = await serviceModel.findByIdAndUpdate(
      req.params._id,
      {
        name,
        url,
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
      message: "Service content updated successfully.",
      updatedService,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating Service due to ${error.message}`,
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

module.exports = {
  createService,
  updateService,
  getServices,
};
