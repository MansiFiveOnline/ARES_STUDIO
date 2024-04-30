const jobApplicationController = require("../controllers/jobApplicationController");
const express = require("express");
const route = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/applications"); // Specify the folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for storing
  },
});

const upload = multer({ storage: storage });

route.post(
  "/",
  upload.single("document"),
  jobApplicationController.createApplication
);

route.patch(
  "/:_id",
  upload.single("document"),
  jobApplicationController.updateApplication
);

route.get("/", jobApplicationController.getApplications);

route.delete("/:_id", jobApplicationController.deleteApplication);

module.exports = route;
