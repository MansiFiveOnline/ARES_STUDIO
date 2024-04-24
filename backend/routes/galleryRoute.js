const galleryController = require("../controllers/galleryController");
const express = require("express");
const route = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/gallery"); // Specify the folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for storing
  },
});
const upload = multer({ storage: storage });

route.post("/", upload.single("media"), galleryController.createGallery);

route.patch("/:_id", upload.single("media"), galleryController.updateGallery);

route.get("/", galleryController.getGalleries);

route.delete("/:_id", galleryController.deleteGallery);

module.exports = route;
