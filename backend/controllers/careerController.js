const careerModel = require("../models/careerModel");
const path = require("path");
const url = require("url");

// Function to check if the input is a URL
const isURL = (str) => {
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
};

const createCareer = async (req, res) => {
  try {
    const { title, subtitle, media, metaTitle, metaDescription } = req.body;
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

    const newCareer = new careerModel({
      title,
      subtitle,
      type: fileType,
      media: mediaData,
      metaTitle,
      metaDescription,
    });

    await newCareer.save();

    return res.status(200).json({
      message: "Added Career content successfully.",
      newCareer,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding career due to ${error.message}`,
    });
  }
};

// const updateCareer = async (req, res) => {
//   try {
//     const { title, subtitle, media } = req.body;
//     // let image = req.body.image;

//     // Fetch the existing service data from the database
//     const existingCareer = await careerModel.findById(req.params._id);

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
//       updatedFields.type = existingCareer.type;
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
//         mediaData = existingCareer.media;
//       }

//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }
//     const updatedCareer = await careerModel.findByIdAndUpdate(
//       req.params._id,
//       updatedFields,
//       { new: true }
//     );

//     return res.status(200).json({
//       message: "Career content updated successfully.",
//       updatedCareer,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in updating Career due to ${error.message}`,
//     });
//   }
// };

const updateCareer = async (req, res) => {
  try {
    const { title, subtitle, media, metaTitle, metaDescription } = req.body;

    // Fetch the existing career data from the database
    const existingCareer = await careerModel.findById(req.params._id);

    // Initialize variables to store updated field values
    let updatedFields = {};

    if (title !== undefined) {
      updatedFields.title = title;
    }
    if (subtitle !== undefined) {
      updatedFields.subtitle = subtitle;
    }

    if (metaTitle !== undefined) {
      updatedFields.metaTitle = metaTitle;
    }

    if (metaDescription !== undefined) {
      updatedFields.metaDescription = metaDescription;
    }

    if (media !== undefined) {
      // Determine the type based on the provided media
      let fileType = existingCareer.type; // Default to existing type
      let mediaData = existingCareer.media;

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

    const updatedCareer = await careerModel.findByIdAndUpdate(
      req.params._id,
      updatedFields,
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
      count: careers.length,
      careers,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching careers due to ${error.message}`,
    });
  }
};

const getCareer = async (req, res) => {
  try {
    const career = await careerModel.findById(req.params._id);
    console.log(req.params._id);
    if (!career) {
      return res.status(400).json({
        message: "No Career is created with this id.",
      });
    }

    return res.status(200).json({
      message: "Career fetched successfully.",
      career,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching career due to ${error.message}`,
    });
  }
};

const deleteCareer = async (req, res) => {
  try {
    const careerExists = await careerModel.findById({
      _id: req.params._id,
    });

    if (careerExists.length === 0) {
      return res.status(400).json({
        message: "No career are created. Kindly create one.",
      });
    }

    const deletedCareer = await careerModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "Career deleted successfully.",
      deletedCareer,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting career due to ${error.message}`,
    });
  }
};

module.exports = {
  createCareer,
  updateCareer,
  getCareers,
  getCareer,
  deleteCareer,
};
