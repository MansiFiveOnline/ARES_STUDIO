const passwordController = require("../controllers/passwordController");
const express = require("express");
const route = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");

route.post("/", adminMiddleware, passwordController.createEmail);

route.patch("/:_id", adminMiddleware, passwordController.updatePassword);

route.get("/emails", passwordController.getEmails);

module.exports = route;
