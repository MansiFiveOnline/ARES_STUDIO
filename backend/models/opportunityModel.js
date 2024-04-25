const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
  },
  description: {
    type: String,
    maxlength: 150,
  },
  responsibility: {
    type: String,
  },
  qualification: {
    type: String,
  },
});

const opportunityModel = mongoose.model("Opportunity", opportunitySchema);

module.exports = opportunityModel;
