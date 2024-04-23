const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
    required: true,
  },
  description: {
    type: String,
    maxlength: 150,
    required: true,
  },
  responsibility: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
});

const opportunityModel = mongoose.model("Opportunity", opportunitySchema);

module.exports = opportunityModel;
