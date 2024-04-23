// const mongoose = require("mongoose");

// const serviceSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   url: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//     maxlength: 20,
//   },
//   subtitle: {
//     type: String,
//     default: true,
//     maxlength: 50,
//   },
//   description: {
//     type: String,
//     maxlength: 150,
//   },
//   //   type: {
//   //     type: String,
//   //     required: true,
//   //     enum: ["image", "iframe"],
//   //   },
//   media: {
//     type: Array,
//     filename: {
//       type: String,
//       required: function () {
//         return this.type === "image";
//       },
//     },
//     filepath: {
//       type: String,
//       required: function () {
//         return this.type === "image";
//       },
//     },
//     iframeUrl: {
//       // Adding a field for iframe URL
//       type: String,
//       required: function () {
//         return this.type === "iframe";
//       }, // Iframe URL is required only if the type is "iframe"
//     },
//   },
// });

// const serviceModel = mongoose.model("Service", serviceSchema);

// module.exports = serviceModel;

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
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
    enum: ["image", "video"],
  },
  file: {
    type: String,
    filename: {
      type: String,
    },
    filepath: {
      type: String,
    },
  },
  // file: {
  //   type: {
  //     type: String,
  //     enum: ["image", "iframe"],
  //   },
  //   filename: {
  //     type: String,
  //     required: function () {
  //       return this.media && this.media.type === "image";
  //     },
  //   },
  //   filepath: {
  //     type: String,
  //     required: function () {
  //       return this.media && this.media.type === "image";
  //     },
  //   },
  //   iframeUrl: {
  //     type: String,
  //     required: function () {
  //       return this.media && this.media.type === "iframe";
  //     },
  //   },
  // },
});

const serviceModel = mongoose.model("Service", serviceSchema);

module.exports = serviceModel;
