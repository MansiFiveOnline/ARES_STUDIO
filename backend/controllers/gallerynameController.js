const galleryNameModel = require("../models/gallerynameModel");

const createGalleryName = async (req, res) => {
  try {
    const { service_name, gallery_name } = req.body;

    const newGalleryName = new galleryNameModel({
      service_name,
      gallery_name,
    });

    await newGalleryName.save();

    return res.status(200).json({
      message: "Added Gallery name content sucessfully.",
      newGalleryName,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in creating gallery name due to ${error.message}`,
    });
  }
};

const updateGalleryName = async (req, res) => {
  try {
    const { service_name, gallery_name } = req.body;
    // let image = req.body.image;

    const updatedGalleryName = await galleryNameModel.findByIdAndUpdate(
      req.params._id,
      {
        service_name,
        gallery_name,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Gallery name content updated successfully.",
      updatedGalleryName,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating Gallery name due to ${error.message}`,
    });
  }
};

const getGalleryName = async (req, res) => {
  try {
    const galleryName = await galleryNameModel.findById(req.params._id);

    if (galleryName.length === 0) {
      return res.status(400).json({
        message: "No gallery names are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "gallery Name fetched successfully.",
      galleryName,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching galleryName due to ${error.message}`,
    });
  }
};

const getGalleryNames = async (req, res) => {
  try {
    const galleryNames = await galleryNameModel.find();

    if (galleryNames.length === 0) {
      return res.status(400).json({
        message: "No gallery names are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "All gallery names fetched successfully.",
      count: galleryNames.length,
      galleryNames,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching gallery names due to ${error.message}`,
    });
  }
};

// const getGalleryNamesByService = async (req, res) => {
//   try {
//     const { service } = req.query;
//     const gallery = await galleryModel.find({ service });
//     res.status(200).json({
//       message: "Gallery names fetched successfully",
//       gallery,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: `Error is fetching gallery names due to ${error.message}`,
//     });
//   }
// };

const deleteGalleryName = async (req, res) => {
  try {
    const galleryNameExists = await galleryNameModel.findById({
      _id: req.params._id,
    });

    if (galleryNameExists.length === 0) {
      return res.status(400).json({
        message: "No gallery names are created. Kindly create one.",
      });
    }

    const deletedGalleryName = await galleryNameModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "gallery Name deleted successfully.",
      deletedGalleryName,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting gallery Name due to ${error.message}`,
    });
  }
};

module.exports = {
  createGalleryName,
  updateGalleryName,
  getGalleryName,
  getGalleryNames,
  deleteGalleryName,
};
