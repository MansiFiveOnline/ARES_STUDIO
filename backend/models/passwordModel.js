const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
    minlength: 8,
  },
});

const passwordModel = mongoose.model("Passwords", passwordSchema);

module.exports = passwordModel;
