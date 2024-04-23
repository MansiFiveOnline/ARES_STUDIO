const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["image", "video"],
  },
  file: {
    type: Array,
    filename: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
});

const galleryModel = mongoose.model("Gallery", gallerySchema);

module.exports = galleryModel;
