const jobApplicationModel = require("../models/jobApplicationModel");
const multer = require("multer");
const path = require("path");

// Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "/uploads/applications")); // Specify upload directory
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     ); // Generate unique filename
//   },
// });

// const upload = multer({
//   storage: storage,
// }).array("document");

// const createApplication = async (req, res) => {
//   try {
//     //Handle file uploads
//     upload(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ message: err });
//       } else {
//         // Extract form data
//         const { name, email, phone_no, location, position, message } = req.body;

//         // Get file paths of uploaded documents
//         const documentPaths = req.files.map((file) => file.path);

//         // Create job application object
//         const newApplication = new jobApplicationModel({
//           name,
//           email,
//           phone_no,
//           location,
//           position,
//           document: documentPaths,
//           message,
//         });

//         // Save job application to the database
//         await newApplication.save();

//         return res.status(200).json({
//           message: "Job application created successfully",
//           data: newApplication,
//         });
//       }
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in creating application due to ${error.message}`,
//     });
//   }
// };

const createApplication = async (req, res) => {
  try {
    // Extract form data
    const { name, email, phone_no, location, position, message, document } =
      req.body;

    let documentData = {};

    const file = req.file;

    // let fileType = "";

    if (file) {
      // A file is provided
      // Check if the file is a PDF document
      const isPDFDocument = (file) => {
        const extname = path.extname(file.originalname).toLowerCase();
        return extname === ".pdf";
      };

      if (!isPDFDocument(file)) {
        return res.status(400).json({
          message: "Unsupported file type. Please upload a PDF document.",
        });
      }

      fileType = "document"; // Set fileType to "document" for PDF documents
      documentData = {
        filename: req.file.originalname,
        filepath: req.file.path,
      };
    } else {
      // No document provided
      return res.status(400).json({
        message: "A PDF document is required.",
      });
    }

    // Create job application object
    const newApplication = new jobApplicationModel({
      name,
      email,
      phone_no,
      location,
      position,
      document: documentData,
      message,
    });

    // Save job application to the database
    await newApplication.save();

    return res.status(200).json({
      message: "Job application created successfully",
      data: newApplication,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in creating application due to ${error.message}`,
    });
  }
};

// const updateApplication = async (req, res) => {
//   try {
//     const { name, email, phone_no, location, position, message, document } =
//       req.body;

//     // Fetch the existing service data from the database
//     const existingApplication = await jobApplicationModel.findById(
//       req.params._id
//     );

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined) {
//       updatedFields.name = name;
//     }
//     if (email !== undefined) {
//       updatedFields.email = email;
//     }
//     if (phone_no !== undefined) {
//       updatedFields.phone_no = phone_no;
//     }
//     if (location !== undefined) {
//       updatedFields.location = location;
//     }
//     if (position !== undefined) {
//       updatedFields.position = position;
//     }
//     if (message !== undefined) {
//       updatedFields.message = message;
//     }

//     // Handle media field separately based on whether it's an image file or an iframe URL
//     if (req.files && req.files.document) {
//       const mediaFile = req.files.document;

//       // Check if media is an image file
//       if (mediaFile.mimetype.startsWith("image")) {
//         // If media is an image file, set type to "image"
//         updatedFields.type = "image";
//         updatedFields.media = {
//           filename: mediaFile.originalname,
//           filepath: mediaFile.path,
//           iframe: null,
//         };
//       } else {
//         // If media is not an image file, assume it's an iframe URL and set type to "video"
//         updatedFields.type = "video";
//         updatedFields.media = {
//           filename: null,
//           filepath: null,
//           iframe: mediaFile.data.toString(), // Assuming the iframe URL is in the file data
//         };
//       }
//     } else if (req.body.media !== undefined && req.body.media.trim() !== "") {
//       const mediaUrl = req.body.media.trim();

//       // Check if media is an iframe URL or an image URL
//       const isVideo = mediaUrl.startsWith("https://");

//       // Set type based on media type
//       updatedFields.type = isVideo ? "video" : "image";

//       // Set media data accordingly
//       updatedFields.media = {
//         filename: null,
//         filepath: null,
//         iframe: mediaUrl,
//       };
//     } else {
//       // If media is not provided, use existing media data and type
//       updatedFields.type = existingService.type || "";
//       updatedFields.media = existingService.media || {};
//     }

//     // Update the service with the updated fields
//     const updatedService = await jobApplicationModel.findByIdAndUpdate(
//       req.params._id,
//       updatedFields,
//       { new: true }
//     );

//     return res.status(200).json({
//       message: "Service content updated successfully.",
//       updatedService,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in updating Service due to ${error.message}`,
//     });
//   }
// };

const updateApplication = async (req, res) => {
  try {
    const { name, email, phone_no, location, position, message, document } =
      req.body;

    // Fetch the existing application data from the database
    const existingApplication = await jobApplicationModel.findById(
      req.params._id
    );

    // Initialize variables to store updated field values
    let updatedFields = {};

    // Check each field to see if it exists in the request body and update accordingly
    if (name !== undefined) {
      updatedFields.name = name;
    }
    if (email !== undefined) {
      updatedFields.email = email;
    }
    if (phone_no !== undefined) {
      updatedFields.phone_no = phone_no;
    }
    if (location !== undefined) {
      updatedFields.location = location;
    }
    if (position !== undefined) {
      updatedFields.position = position;
    }
    if (message !== undefined) {
      updatedFields.message = message;
    }

    // Handle document field separately
    if (req.files && req.files.document) {
      const documentFile = req.files.document;

      // Check if document is a PDF file
      if (!documentFile.mimetype.endsWith("pdf")) {
        return res.status(400).json({
          message: "Unsupported file type. Please upload a PDF document.",
        });
      }

      // Set document data
      updatedFields.document = {
        filename: documentFile.originalname,
        filepath: documentFile.path,
      };
    }

    // Update the application with the updated fields
    const updatedApplication = await jobApplicationModel.findByIdAndUpdate(
      req.params._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Application content updated successfully.",
      updatedApplication,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating Application due to ${error.message}`,
    });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await jobApplicationModel.find();

    return res.status(200).json({
      message: "Applications retrieved successfully.",
      applications: applications,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching applications: ${error.message}`,
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const applicationExist = await jobApplicationModel.findById({
      _id: req.params._id,
    });

    if (applicationExist.length === 0) {
      return res.status(400).json({
        message: "No applications are created. Kindly create one.",
      });
    }

    const deletedApplication = await jobApplicationModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "Application deleted successfully.",
      deletedApplication,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting application: ${error.message}`,
    });
  }
};

module.exports = {
  createApplication,
  updateApplication,
  getApplications,
  deleteApplication,
};
