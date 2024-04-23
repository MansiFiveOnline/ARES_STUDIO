const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
    required: true,
  },
  subtitle: {
    type: String,
    maxlength: 50,
    required: true,
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
});

const careerModel = mongoose.model("Career", careerSchema);

module.exports = careerModel;
