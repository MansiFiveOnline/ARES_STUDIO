const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
  },
  subtitle: {
    type: String,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 150,
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
  about_description: {
    type: String,
    maxlength: 500,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
});

const aboutModel = mongoose.model("About", aboutSchema);

module.exports = aboutModel;
