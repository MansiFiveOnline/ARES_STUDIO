const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
  service_name: {
    type: String,
    required: true,
  },
  gallery_name: {
    type: String,
    trim: true,
    required: true,
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
