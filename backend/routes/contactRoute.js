const contactController = require("../controllers/contactController")
const express = require("express")
const route = express.Router()

route.get("/", contactController.getContacts);

route.delete("/:id", contactController.deleteContact)

module.exports = route