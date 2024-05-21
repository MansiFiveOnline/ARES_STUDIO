const projectDetailsController = require("../controllers/projectDetailsController");
const express = require("express");
const route = express.Router();
const multer = require("multer");
const adminMiddleware = require("../middleware/adminMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/project_details"); // Specify the folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for storing
  },
});

const upload = multer({ storage: storage });

route.post(
  "/",
  upload.array("media", 10), // Handle up to 10 files
  adminMiddleware,
  projectDetailsController.createProjectDetail
);

route.patch(
  "/:_id",
  upload.array("media", 10),
  adminMiddleware,
  projectDetailsController.updateProjectDetail
);

route.get("/:_id", projectDetailsController.getProjectDetail);

route.get("/", projectDetailsController.getProjectDetails);

route.delete(
  "/:_id",
  adminMiddleware,
  projectDetailsController.deleteProjectDetail
);

module.exports = route;
