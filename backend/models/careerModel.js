const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
  },
  subtitle: {
    type: String,
    maxlength: 50,
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
});

const careerModel = mongoose.model("Career", careerSchema);

module.exports = careerModel;
