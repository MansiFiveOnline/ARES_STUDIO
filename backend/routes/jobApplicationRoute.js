const jobApplicationController = require("../controllers/jobApplicationController")
const express = require("express")
const route = express.Router()

route.get("/", jobApplicationController.getApplications);

route.delete("/:id", jobApplicationController.deleteApplication)

module.exports = route