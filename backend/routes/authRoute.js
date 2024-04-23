const authController = require("../controllers/authController")
const express = require("express")
const route = express.Router()

route.post("/register", authController.register);

route.post("/login", authController.login)

route.post("/logout", authController.logout)

route.post("/refresh_token", authController.recreateAccessToken)

module.exports = route