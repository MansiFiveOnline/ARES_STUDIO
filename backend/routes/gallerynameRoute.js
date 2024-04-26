const galleryNameController = require("../controllers/gallerynameController");
const express = require("express");
const route = express.Router();

route.post("/", galleryNameController.createGalleryName);

route.patch("/:_id", galleryNameController.updateGalleryName);

route.get("/:_id", galleryNameController.getGalleryName);

route.get("/", galleryNameController.getGalleryNames);

route.delete("/:_id", galleryNameController.deleteGalleryName);

module.exports = route;
