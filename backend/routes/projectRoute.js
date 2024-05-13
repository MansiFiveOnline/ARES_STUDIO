const projectController = require("../controllers/projectController");
const express = require("express");
const route = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/career"); // Specify the folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for storing
  },
});
const upload = multer({ storage: storage });

route.post("/", upload.single("media"), projectController.createProject);

route.patch("/:_id", upload.single("media"), projectController.updateProject);

route.get("/", projectController.getProjects);

route.get("/:_id", projectController.getProject);

route.delete("/:_id", projectController.deleteProject);

module.exports = route;
