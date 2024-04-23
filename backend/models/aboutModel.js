const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
    require: true,
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
    enum: ["image", "video"],
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
});

const aboutModel = mongoose.model("About", aboutSchema);

module.exports = aboutModel;
