const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
  },
  linkedin_url: {
    type: String,
    required: true,
  },
  image: {
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
  sequence: {
    type: Number,
  },
});

const teamModel = mongoose.model("Team", teamSchema);

module.exports = teamModel;
