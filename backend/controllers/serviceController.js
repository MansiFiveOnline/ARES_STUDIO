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

    // // Check if media is a URL (iframe)
    // if (isURL(media)) {
    //   fileType = "video"; // Set fileType to "video" for iframe URLs
    //   mediaData = {
    //     filename: null,
    //     filepath: null,
    //     iframe: media.trim(),
    //   };
    // } else {
    //   // const file = req.file;
    //   if (!file) {
    //     return res.status(400).json({
    //       message: "File is required for the media field.",
    //     });
    //   }
    //   // Check if the file is a WebP image
    //   const isWebPImage = (file) => {
    //     const extname = path.extname(file.originalname).toLowerCase();
    //     return extname === ".webp";
    //   };

    //   if (!isWebPImage(file)) {
    //     return res.status(400).json({
    //       message: "Unsupported file type. Please upload a WebP image.",
    //     });
    //   }

    //   fileType = "image";
    //   mediaData = {
    //     filename: req.file.originalname,
    //     filepath: req.file.path,
    //     iframe: null,
    //   };
    // }

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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
//       updatedFields.media = media;
//     }
//     if (metaTitle !== undefined) {
//       updatedFields.metaTitle = metaTitle;
//     }
//     if (metaDescription !== undefined) {
//       updatedFields.metaDescription = metaDescription;
//     }

//     let fileType = "";
//     let mediaData = {};

//     // Function to check if the input is a URL
//     const isURL = (str) => {
//       try {
//         new URL(str);
//         return true;
//       } catch (error) {
//         return false;
//       }
//     };

//     // Check if media is provided and is a URL (iframe)
//     if (media && isURL(media)) {
//       fileType = "video"; // Set fileType to "video" for iframe URLs
//       mediaData = {
//         filename: null,
//         filepath: null,
//         iframe: media.trim(),
//       };
//     } else if (req.file) {
//       // Handle the case where a file is uploaded
//       // Check if the file is a WebP image
//       const isWebPImage = (file) => {
//         const extname = path.extname(file.originalname).toLowerCase();
//         return extname === ".webp";
//       };

//       if (!isWebPImage(req.file)) {
//         return res.status(400).json({
//           message: "Unsupported file type. Please upload a WebP image.",
//         });
//       }

//       fileType = "image";
//       mediaData = {
//         filename: req.file.originalname,
//         filepath: req.file.path,
//         iframe: null,
//       };
//     } else {
//       // If media is not provided, use the existing media data
//       mediaData = existingService.media;
//     }

//     updatedFields.type = fileType;
//     updatedFields.media = mediaData;

//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
//       updatedFields.media = media;
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
//       if (isURL(media)) {
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
//         mediaData = existingService.media;
//       }

//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Retain the existing type if it exists
//     if (existingService.type) {
//       updatedFields.type = existingService.type;
//     }

//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
//       // If media is provided, update type and media accordingly
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

//       if (isURL(media)) {
//         // If media is a URL, set type to "video"
//         fileType = "video";
//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // If a file is uploaded, set type to "image"
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
//         // If media is not provided, retain the existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
//       // If media is provided, update type and media accordingly
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

//       if (isURL(media)) {
//         // If media is a URL, set type to "video"
//         fileType = "video";
//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // If a file is uploaded, set type to "image"
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
//         // If media is not provided, retain the existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Retain the existing type if it exists
//     if (existingService.type && !updatedFields.type) {
//       updatedFields.type = existingService.type;
//     }

//     // Retain the existing media if it exists
//     if (!media && existingService.media && !updatedFields.media) {
//       updatedFields.media = existingService.media;
//     }

//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
//       // If media is provided, update type and media accordingly
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

//       if (isURL(media)) {
//         // If media is a URL, set type to "video"
//         fileType = "video";
//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // If a file is uploaded, set type to "image"
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
//         // If media is not provided, retain the existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Retain the existing type if it exists
//     if (existingService.type && !updatedFields.type) {
//       updatedFields.type = existingService.type;
//     }

//     // Retain the existing media if it exists
//     if (!media && existingService.media && !updatedFields.media) {
//       updatedFields.media = existingService.media;
//     }

//     // Update the service with the updated fields
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
//       // If media is provided, update type and media accordingly
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

//       if (isURL(media)) {
//         // If media is a URL, set type to "video"
//         fileType = "video";
//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // If a file is uploaded, set type to "image"
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
//         // If media is not provided, retain the existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Retain the existing type if it exists
//     if (existingService.type && !updatedFields.type) {
//       updatedFields.type = existingService.type;
//     }

//     // Retain the existing media if it exists
//     if (!media && existingService.media && !updatedFields.media) {
//       updatedFields.media = existingService.media;
//     }

//     // Update the service with the updated fields
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
//       // If media is provided, update type and media accordingly
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

//       if (isURL(media)) {
//         // If media is a URL, set type to "video"
//         fileType = "video";
//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // If a file is uploaded, set type to "image"
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
//         // If media is not provided, retain the existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Retain the existing type if it exists and media is not provided
//     if (!media && existingService.type && !updatedFields.type) {
//       updatedFields.type = existingService.type;
//     }

//     // Retain the existing media if it exists and media is not provided
//     if (!media && existingService.media && !updatedFields.media) {
//       updatedFields.media = existingService.media;
//     }

//     // Update the service with the updated fields
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
//       // If media is provided as a file upload
//       if (req.file) {
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

//         // Set type to "image" for file uploads
//         updatedFields.type = "image";
//         updatedFields.media = {
//           filename: req.file.originalname,
//           filepath: req.file.path,
//           iframe: null,
//         };
//       } else if (media.trim() !== "") {
//         // If media is provided as a URL, set type to "video"
//         updatedFields.type = "video";
//         updatedFields.media = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       }
//     }

//     // Update the service with the updated fields
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
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

//       if (isURL(media)) {
//         fileType = "video"; // Set type to "video" for URLs
//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // Handle the case where a file is uploaded
//         const isWebPImage = (file) => {
//           const extname = path.extname(file.originalname).toLowerCase();
//           return extname === ".webp";
//         };

//         if (!isWebPImage(req.file)) {
//           return res.status(400).json({
//             message: "Unsupported file type. Please upload a WebP image.",
//           });
//         }

//         fileType = "image"; // Set type to "image" for file uploads
//         mediaData = {
//           filename: req.file.originalname,
//           filepath: req.file.path,
//           iframe: null,
//         };
//       } else {
//         // If media is not provided, use existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Update the service with the updated fields
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
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

//       if (isURL(media)) {
//         fileType = "video"; // Set type to "video" for URLs
//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // Handle the case where a file is uploaded
//         const isWebPImage = (file) => {
//           const extname = path.extname(file.originalname).toLowerCase();
//           return extname === ".webp";
//         };

//         if (!isWebPImage(req.file)) {
//           return res.status(400).json({
//             message: "Unsupported file type. Please upload a WebP image.",
//           });
//         }

//         fileType = "image"; // Set type to "image" for file uploads
//         mediaData = {
//           filename: req.file.originalname,
//           filepath: req.file.path,
//           iframe: null,
//         };
//       } else {
//         // If media is not provided, use existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       // Update media and type fields
//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Update the service with the updated fields
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
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

//       if (isURL(media)) {
//         fileType = "video"; // Set type to "video" for URLs
//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // Handle the case where a file is uploaded
//         const isWebPImage = (file) => {
//           const extname = path.extname(file.originalname).toLowerCase();
//           return extname === ".webp";
//         };

//         if (!isWebPImage(req.file)) {
//           return res.status(400).json({
//             message: "Unsupported file type. Please upload a WebP image.",
//           });
//         }

//         fileType = "image"; // Set type to "image" for file uploads
//         mediaData = {
//           filename: req.file.originalname,
//           filepath: req.file.path,
//           iframe: null,
//         };
//       } else {
//         // If media is not provided, use existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       // Update media and type fields
//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Update the service with the updated fields
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
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

//       if (isURL(media)) {
//         fileType = "video"; // Set type to "video" for URLs
//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // Handle the case where a file is uploaded
//         const isWebPImage = (file) => {
//           const extname = path.extname(file.originalname).toLowerCase();
//           return extname === ".webp";
//         };

//         if (!isWebPImage(req.file)) {
//           return res.status(400).json({
//             message: "Unsupported file type. Please upload a WebP image.",
//           });
//         }

//         fileType = "image"; // Set type to "image" for file uploads
//         mediaData = {
//           filename: req.file.originalname,
//           filepath: req.file.path,
//           iframe: null,
//         };
//       } else {
//         // If media is not provided, use existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       // Update media and type fields
//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Update the service with the updated fields
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
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

//       if (isURL(media)) {
//         fileType = "video"; // Set type to "video" for URLs
//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // Handle the case where a file is uploaded
//         const isWebPImage = (file) => {
//           const extname = path.extname(file.originalname).toLowerCase();
//           return extname === ".webp";
//         };

//         if (!isWebPImage(req.file)) {
//           return res.status(400).json({
//             message: "Unsupported file type. Please upload a WebP image.",
//           });
//         }

//         fileType = "image"; // Set type to "image" for file uploads
//         mediaData = {
//           filename: req.file.originalname,
//           filepath: req.file.path,
//           iframe: null,
//         };
//       } else {
//         // If media is not provided, use existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       // Update media and type fields
//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Update the service with the updated fields
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
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

//       if (isURL(media)) {
//         // Check if media is an iframe URL or an image URL
//         if (media.trim().startsWith("https://")) {
//           fileType = "video"; // Set type to "video" for iframe URLs
//         } else {
//           fileType = "image"; // Set type to "image" for image URLs
//         }

//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // Handle the case where a file is uploaded
//         const isWebPImage = (file) => {
//           const extname = path.extname(file.originalname).toLowerCase();
//           return extname === ".webp";
//         };

//         if (!isWebPImage(req.file)) {
//           return res.status(400).json({
//             message: "Unsupported file type. Please upload a WebP image.",
//           });
//         }

//         fileType = "image"; // Set type to "image" for file uploads
//         mediaData = {
//           filename: req.file.originalname,
//           filepath: req.file.path,
//           iframe: null,
//         };
//       } else {
//         // If media is not provided, use existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       // Update media and type fields
//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Update the service with the updated fields
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
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

//       if (isURL(media)) {
//         // Check if media is an iframe URL or an image URL
//         if (media.trim().startsWith("https://")) {
//           fileType = "video"; // Set type to "video" for iframe URLs
//         } else {
//           fileType = "image"; // Set type to "image" for image URLs
//         }

//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // Handle the case where a file is uploaded
//         const isWebPImage = (file) => {
//           const extname = path.extname(file.originalname).toLowerCase();
//           return extname === ".webp";
//         };

//         if (!isWebPImage(req.file)) {
//           return res.status(400).json({
//             message: "Unsupported file type. Please upload a WebP image.",
//           });
//         }

//         fileType = "image"; // Set type to "image" for file uploads
//         mediaData = {
//           filename: req.file.originalname,
//           filepath: req.file.path,
//           iframe: null,
//         };
//       } else {
//         // If media is not provided, use existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       // Update media and type fields
//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Update the service with the updated fields
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
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

//       if (isURL(media)) {
//         // Check if media is an iframe URL or an image URL
//         if (media.trim().startsWith("https://")) {
//           fileType = "video"; // Set type to "video" for iframe URLs
//         } else {
//           fileType = "image"; // Set type to "image" for image URLs
//         }

//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // Handle the case where a file is uploaded
//         const isWebPImage = (file) => {
//           const extname = path.extname(file.originalname).toLowerCase();
//           return extname === ".webp";
//         };

//         if (!isWebPImage(req.file)) {
//           return res.status(400).json({
//             message: "Unsupported file type. Please upload a WebP image.",
//           });
//         }

//         fileType = "image"; // Set type to "image" for file uploads
//         mediaData = {
//           filename: req.file.originalname,
//           filepath: req.file.path,
//           iframe: null,
//         };
//       } else {
//         // If media is not provided, use existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       // Update media and type fields
//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Update the service with the updated fields
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       subtitle,
//       description,
//       media,
//       metaTitle,
//       metaDescription,
//     } = req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (media !== undefined) {
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

//       if (isURL(media)) {
//         // Check if media is an iframe URL or an image URL
//         if (media.trim().startsWith("https://")) {
//           fileType = "video"; // Set type to "video" for iframe URLs
//         } else {
//           fileType = "image"; // Set type to "image" for image URLs
//         }

//         mediaData = {
//           filename: null,
//           filepath: null,
//           iframe: media.trim(),
//         };
//       } else if (req.file) {
//         // Handle the case where a file is uploaded
//         const isWebPImage = (file) => {
//           const extname = path.extname(file.originalname).toLowerCase();
//           return extname === ".webp";
//         };

//         if (!isWebPImage(req.file)) {
//           return res.status(400).json({
//             message: "Unsupported file type. Please upload a WebP image.",
//           });
//         }

//         fileType = "image"; // Set type to "image" for file uploads
//         mediaData = {
//           filename: req.file.originalname,
//           filepath: req.file.path,
//           iframe: null,
//         };
//       } else {
//         // If media is not provided, use existing media data and type
//         fileType = existingService.type || "";
//         mediaData = existingService.media || {};
//       }

//       // Update media and type fields
//       updatedFields.type = fileType;
//       updatedFields.media = mediaData;
//     }

//     // Update the service with the updated fields
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const { name, title, subtitle, description, metaTitle, metaDescription } =
//       req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (metaTitle !== undefined) {
//       updatedFields.metaTitle = metaTitle;
//     }
//     if (metaDescription !== undefined) {
//       updatedFields.metaDescription = metaDescription;
//     }

//     // Handle media field separately based on whether it's an image file or an iframe URL
//     if (req.files && req.files.media) {
//       const mediaFile = req.files.media;

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
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

// const updateService = async (req, res) => {
//   try {
//     const { name, title, subtitle, description, metaTitle, metaDescription } =
//       req.body;

//     // Fetch the existing service data from the database
//     const existingService = await serviceModel.findById(req.params._id);

//     // Initialize variables to store updated field values
//     let updatedFields = {};

//     // Check each field to see if it exists in the request body and update accordingly
//     if (name !== undefined && name.trim() !== "") {
//       updatedFields.name = name;

//       // Update the URL based on the updated name
//       const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
//       updatedFields.url = `http:/localhost:8000/api/service/${urlSlug}`;
//     }
//     if (title !== undefined) {
//       updatedFields.title = title;
//     }
//     if (subtitle !== undefined) {
//       updatedFields.subtitle = subtitle;
//     }
//     if (description !== undefined) {
//       updatedFields.description = description;
//     }
//     if (metaTitle !== undefined) {
//       updatedFields.metaTitle = metaTitle;
//     }
//     if (metaDescription !== undefined) {
//       updatedFields.metaDescription = metaDescription;
//     }

//     // Handle media field separately based on whether it's an image file or an iframe URL
//     if (req.files && req.files.media) {
//       const mediaFile = req.files.media;

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
//     const updatedService = await serviceModel.findByIdAndUpdate(
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

const updateService = async (req, res) => {
  try {
    const { name, title, subtitle, description, metaTitle, metaDescription } =
      req.body;

    // Fetch the existing service data from the database
    const existingService = await serviceModel.findById(req.params._id);

    // Initialize variables to store updated field values
    let updatedFields = {};

    // Check each field to see if it exists in the request body and update accordingly
    if (name !== undefined && name.trim() !== "") {
      updatedFields.name = name;

      // Update the URL based on the updated name
      const urlSlug = name.toLowerCase().replace(/\s+/g, "-");
      updatedFields.url = `http://localhost:8000/api/service/${urlSlug}`;
    }
    if (title !== undefined) {
      updatedFields.title = title;
    }
    if (subtitle !== undefined) {
      updatedFields.subtitle = subtitle;
    }
    if (description !== undefined) {
      updatedFields.description = description;
    }
    if (metaTitle !== undefined) {
      updatedFields.metaTitle = metaTitle;
    }
    if (metaDescription !== undefined) {
      updatedFields.metaDescription = metaDescription;
    }

    // Handle media field separately based on whether it's an image file or an iframe URL
    if (req.files && req.files.media) {
      const mediaFile = req.files.media;

      // Check if media is an image file
      if (mediaFile.mimetype.startsWith("image")) {
        // If media is an image file, set type to "image"
        updatedFields.type = "image";
        updatedFields.media = {
          filename: mediaFile.originalname,
          filepath: mediaFile.path,
          iframe: null,
        };
      } else {
        // If media is not an image file, assume it's an iframe URL and set type to "video"
        updatedFields.type = "video";
        updatedFields.media = {
          filename: null,
          filepath: null,
          iframe: mediaFile.data.toString(), // Assuming the iframe URL is in the file data
        };
      }
    } else if (req.body.media !== undefined && req.body.media.trim() !== "") {
      const mediaUrl = req.body.media.trim();

      // Check if media is an iframe URL or an image URL
      const isVideo = mediaUrl.startsWith("https://");

      // Set type based on media type
      updatedFields.type = isVideo ? "video" : "image";

      // Set media data accordingly
      updatedFields.media = {
        filename: null,
        filepath: null,
        iframe: mediaUrl,
      };
    } else {
      // If media is not provided, use existing media data and type
      updatedFields.type = existingService.type || "";
      updatedFields.media = existingService.media || {};
    }

    // Update the service with the updated fields
    const updatedService = await serviceModel.findByIdAndUpdate(
      req.params._id,
      updatedFields,
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
      count: services.length,
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
