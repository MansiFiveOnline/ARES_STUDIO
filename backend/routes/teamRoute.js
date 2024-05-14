const teamController = require("../controllers/teamController");
const express = require("express");
const route = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/teams"); // Specify the folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for storing
  },
});
const upload = multer({ storage: storage });

route.post("/", upload.single("image"), teamController.createUser);

route.patch("/:_id", upload.single("image"), teamController.updateUser);

route.get("/", teamController.getUsers);

route.get("/:_id", teamController.getUser);

route.delete("/:_id", teamController.deleteUser);

route.patch("/sequence/:name", teamController.sequenceUser);

module.exports = route;
