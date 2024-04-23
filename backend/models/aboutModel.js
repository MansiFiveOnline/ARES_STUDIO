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
    enum: ["image", "iframe"],
  },
  media: {
    type: {
      name: String,
      path: String,
      iframeUrl: {
        type: String,
        required: function () {
          return this.type === "iframe";
        },
      },
    },
    validate: {
      validator: function () {
        return this.type === "image" || this.type === "iframe";
      },
      message:
        "Media is required for image type, and iframeUrl is required for iframe type.",
    },
  },
  about_description: {
    type: String,
    maxlength: 500,
  },
});

const aboutModel = mongoose.model("About", aboutSchema);

module.exports = aboutModel;
