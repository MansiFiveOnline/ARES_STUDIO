const opportunityController = require("../controllers/opportunityController");
const express = require("express");
const route = express.Router();

route.post("/", opportunityController.createOpportunity);

route.patch("/:_id", opportunityController.updateOpportunity);

route.get("/:_id", opportunityController.getOpportunity);

route.get("/", opportunityController.getOpportunities);

route.delete("/:_id", opportunityController.deleteOpportunity);

module.exports = route;
