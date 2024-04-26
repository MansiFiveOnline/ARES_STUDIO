const mongoose = require("mongoose");

const galleryNameSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
    unique: false,
  },
  gallery_name: {
    type: String,
    trim: true,
  },
});

const galleryNameModel = mongoose.model("Gallery Names", galleryNameSchema);

module.exports = galleryNameModel;
