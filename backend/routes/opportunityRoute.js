const opportunityController = require("../controllers/opportunityController");
const express = require("express");
const route = express.Router();

route.post("/", opportunityController.createOpportunity);

route.patch("/:_id", opportunityController.updateOpportunity);

module.exports = route;
