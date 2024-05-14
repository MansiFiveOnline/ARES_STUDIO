const projectModel = require("../models/projectModel");
const path = require("path");
const url = require("url");

const createProject = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      service,
      gallery_name,
      media,
      metaTitle,
      metaDescription,
    } = req.body;
    let mediaData = {};

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
    } else if (file) {
      // A file is provided
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
    } else {
      // Neither iframe nor file is provided
      return res.status(400).json({
        message:
          "Either an iFrame URL or an image file is required for the media field.",
      });
    }

    const newProject = new projectModel({
      title,
      subtitle,
      description,
      service,
      gallery_name,
      type: fileType,
      media: mediaData,
      metaTitle,
      metaDescription,
    });

    await newProject.save();

    return res.status(200).json({
      message: "Added Project content successfully.",
      newProject,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding project due to ${error.message}`,
    });
  }
};

// const updateProject = async (req, res) => {
//   try {
//     const { title, subtitle, media } = req.body;
//     // let image = req.body.image;

//     // Fetch the existing service data from the database
//     const existingProject = await projectModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     // if (media !== undefined) {
//     //   updatedFields.media = media;
//     // }

//     // If media is not provided, retain the existing type
//     if (media === undefined) {
//       updatedFields.type = existingProject.type;
//     } else {
//       let fileType = "";
//       let mediaData = {};

//       // Function to check if the input is a URL
//       const isURL = (str) => {
//         try {
//           new URL(str);
//           return true;
//         } catch (error) {
//           return false;
//         }
//       };

//       // Check if media is provided and is a URL (iframe)
//       if (media && isURL(media)) {
//         fileType = "video"; // Set fileType to "video" for iframe URLs
//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // Handle the case where a file is uploaded
//         // Check if the file is a WebP image
//         const isWebPImage = (file) => {
//           const extname = path.extname(file.originalname).toLowerCase();
//           return extname === ".webp";
//         };

//         if (!isWebPImage(req.file)) {
//           return res.status(400).json({
//             message: "Unsupported file type. Please upload a WebP image.",
//           });
//         }

//         fileType = "image";
//         mediaData = {
//           filename: req.file.originalname,
//           filepath: req.file.path,
//           iframe: null,
//         };
//       } else {
//         // If media is not provided, use the existing media data
//         mediaData = existingProject.media;
//       }

//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }
//     const updatedProject = await projectModel.findByIdAndUpdate(
//       req.params._id,
//       updatedFields,
//       { new: true }
//     );

//     return res.status(200).json({
//       message: "project content updated successfully.",
//       updatedProject,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in updating project due to ${error.message}`,
//     });
//   }
// };

const updateProject = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      service,
      gallery_name,
      media,
      metaTitle,
      metaDescription,
    } = req.body;

    // Fetch the existing project data from the database
    const existingProject = await projectModel.findById(req.params._id);

    // Initialize variables to store updated field values
    let updatedFields = {};

    if (title !== undefined) {
      updatedFields.title = title;
    }
    if (subtitle !== undefined) {
      updatedFields.subtitle = subtitle;
    }

    if (description !== undefined) {
      updatedFields.description = description;
    }

    if (service !== undefined) {
      updatedFields.service = service;
    }

    if (gallery_name !== undefined) {
      updatedFields.gallery_name = gallery_name;
    }

    if (metaTitle !== undefined) {
      updatedFields.metaTitle = metaTitle;
    }

    if (metaDescription !== undefined) {
      updatedFields.metaDescription = metaDescription;
    }

    if (media !== undefined) {
      // Determine the type based on the provided media
      let fileType = existingProject.type; // Default to existing type
      let mediaData = existingProject.media;

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
      } else if (req.file) {
        // A file is provided
        // Check if the file is a WebP image
        const isWebPImage = (file) => {
          const extname = path.extname(file.originalname).toLowerCase();
          return extname === ".webp";
        };

        if (!isWebPImage(req.file)) {
          return res.status(400).json({
            message: "Unsupported file type. Please upload a WebP image.",
          });
        }

        fileType = "image";
        // Set filename and filepath for the image
        mediaData = {
          filename: req.file.originalname,
          filepath: req.file.path, // Assuming this is the correct file path
          iframe: null,
        };
      } else {
        // Neither iframe nor file is provided
        return res.status(400).json({
          message:
            "Either an iFrame URL or an image file is required for the media field.",
        });
      }

      updatedFields.type = fileType;
      updatedFields.media = mediaData;
    }

    const updatedProject = await projectModel.findByIdAndUpdate(
      req.params._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Project content updated successfully.",
      updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating project due to ${error.message}`,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await projectModel.find();

    if (projects.length === 0) {
      return res.status(400).json({
        message: "No projects are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "All projects fetched successfully.",
      count: projects.length,
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching projects due to ${error.message}`,
    });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params._id);
    console.log(req.params._id);
    if (!project) {
      return res.status(400).json({
        message: "No project is created with this id.",
      });
    }

    return res.status(200).json({
      message: "project fetched successfully.",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching project due to ${error.message}`,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectExists = await projectModel.findById({
      _id: req.params._id,
    });

    if (projectExists.length === 0) {
      return res.status(400).json({
        message: "No project are created. Kindly create one.",
      });
    }

    const deletedProject = await projectModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "project deleted successfully.",
      deletedProject,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting project due to ${error.message}`,
    });
  }
};

module.exports = {
  createProject,
  updateProject,
  getProjects,
  getProject,
  deleteProject,
};
