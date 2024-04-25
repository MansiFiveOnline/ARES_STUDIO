const serviceController = require("../controllers/serviceController");
const express = require("express");
const route = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/service"); // Specify the folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for storing
  },
});
const upload = multer({ storage: storage });

route.post("/", upload.single("media"), serviceController.createService);

route.patch("/:_id", upload.single("media"), serviceController.updateService);

route.get("/:_id", serviceController.getService);

route.get("/", serviceController.getServices);

route.delete("/:_id", serviceController.deleteService);

module.exports = route;
