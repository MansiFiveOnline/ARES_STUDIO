const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  // media: {
  //   type: {
  //     filename: String,
  //     filepath: String,
  //     iframe: String,
  //   },
  //   required: function () {
  //     return this.type === "image" || this.type === "video";
  //   },
  // },
  media: {
    type: Schema.Types.Mixed,
    required: function () {
      return this.type === "image" || this.type === "video";
    },
  },
});

const careerModel = mongoose.model("Career", careerSchema);

module.exports = careerModel;
