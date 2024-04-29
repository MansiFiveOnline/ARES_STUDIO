const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  url: {
    type: String,
  },
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
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
});

const serviceModel = mongoose.model("Service", serviceSchema);

module.exports = serviceModel;
