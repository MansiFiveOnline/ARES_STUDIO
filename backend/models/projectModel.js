const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
  },
  subtitle: {
    type: String,
    default: true,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 150,
  },
  service: {
    type: String,
  },
  gallery_name: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ["", "image", "video"],
    default: "",
  },
  media: {
    type: Schema.Types.Mixed,
    required: function () {
      return this.type === "image" || this.type === "video";
    },
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
});

const projectModel = mongoose.model("Projects", projectSchema);

module.exports = projectModel;
