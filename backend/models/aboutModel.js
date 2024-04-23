const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
    require: true,
  },
  subtitle: {
    type: String,
    maxlength: 50,
    require: true,
  },
  description: {
    type: String,
    maxlength: 150,
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
  about_description: {
    type: String,
    maxlength: 500,
  },
});

const aboutModel = mongoose.model("About", aboutSchema);

module.exports = aboutModel;
